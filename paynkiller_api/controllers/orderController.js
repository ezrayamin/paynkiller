const { asyncQuery, generateQueryBody } = require('../helpers/queryHelp')
const db = require('../database')
const fs = require('fs')
const handlebars = require('handlebars')
const transporter = require('../helpers/nodemailer')

module.exports = {
    addToCart: async (req, res) => {
        const id_customer = parseInt(req.params.idcustomer)
        const { order_number, id_produk, qty, total_harga } = req.body
        console.log(req.body)
        try {
            const cek = `SELECT * FROM orders WHERE id_customer = ${id_customer} AND id_status = 1`
            const qcek = await asyncQuery(cek)

            let current_order_number = qcek.length !== 0 ? qcek[0].order_number : Date.now()

            let hari = new Date()
            let day = hari.getDate()
            let bulan = hari.getMonth()
            let tahun = hari.getFullYear()

            if (qcek.length === 0) {

                const addOrders = `INSERT INTO orders (order_number, id_customer, id_status, tanggal_transaksi) VALUES
                (${current_order_number}, ${id_customer}, 1, '${tahun}-${bulan + 1}-${day}')`
                await asyncQuery(addOrders)
            }
            // console.log(id_produk)
            const cekQty = `select o.order_number, o.id_customer, od.id_produk, od.qty, od.total_harga, o.id_status 
                            from orders o left join order_details od on o.order_number = od.order_number 
                            where od.id_produk=${db.escape(req.body.id_produk)} and o.order_number=${current_order_number} having o.id_status=1;`
            const qcekQty = await asyncQuery(cekQty)

            if (qcekQty.length !== 0) {
                const prevQty = qcekQty[0].qty
                const prevTotalHarga = qcekQty[0].total_harga
                const prevOrder = qcekQty[0].order_number

                const editCart = `update order_details set qty=${qty + prevQty}, total_harga=${total_harga + prevTotalHarga} 
                where id_produk=${db.escape(id_produk)} and order_number=${prevOrder}`
                await asyncQuery(editCart)
            } else {
                const addDetail = `INSERT INTO order_details (order_number, id_produk, qty, total_harga) VALUES 
                                    (${current_order_number}, ${db.escape(id_produk)}, ${db.escape(qty)}, ${db.escape(total_harga)})`
                await asyncQuery(addDetail)
            }
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    getCartUser: async (req, res) => {
        // console.log(req.user)
        const id = parseInt(req.params.idcustomer)
        console.log('id customer', id)
        try {
            const get = `select o.id_customer, o.order_number, p.id_produk, p.nama_produk, p.gambar_obat, od.id_details, od.qty, sp.jumlah_produk as stock, 
                        p.harga_produk, p.komposisi, os.status as status_order, od.total_harga 
                        from orders o join order_details od on o.order_number = od.order_number 
                        join produk p on od.id_produk = p.id_produk
                        join stok_produk sp on p.id_produk = sp.id_produk
                        join order_status os on o.id_status = os.id
                        where o.id_status = 1 and o.id_customer = ${db.escape(id)}`
            // console.log(get)
            const qget = await asyncQuery(get)

            // const grandTotal = `select sum(od.harga_produk) as grand_total from orders o join order_details od on o.order_number = od.order_number 
            // join produk p on od.id_produk = p.id_produk
            // join order_status os on o.id_status = os.id
            // where o.id_status = 1 and o.id_customer = ${req.user.id_user}`
            // const qgrandTotal =await asyncQuery(grandTotal)
            res.status(200).send(qget)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)

        }
    },
    editQty: async (req, res) => {
        const id = parseInt(req.params.idproduk)
        console.log(req.body)
        const { qty, total_harga, id_details } = req.body
        try {
            const edit = `update order_details set qty=${qty}, total_harga=${total_harga} 
            where id_details=${id_details}`
            await asyncQuery(edit)
            console.log('berhasil edit qty')
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)

        }
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.iddetails)
        console.log('ini reqbody', req.body)
        const { order_number } = req.body
        try {
            const del = `delete from order_details where id_details=${id}`
            await asyncQuery(del)
            console.log(del)
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    checkoutFromCart: async (req, res) => {
        const { order_number, grandTotal } = req.body
        try {
            const updateStatus = `update orders set id_status=2 where order_number=${order_number}`
            await asyncQuery(updateStatus)

            const fixedPrice = `update orders set grandTotal_checkout=${grandTotal} where order_number=${order_number}`
            await asyncQuery(fixedPrice)

            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    ordersCheckout: async (req, res) => {
        // console.log(req.user)
        const id = parseInt(req.params.idcustomer)
        console.log('id customer produk', id)
        try {
            const products = `select o.id_customer, o.order_number, p.id_produk, p.nama_produk, p.gambar_obat, od.id_details, od.qty, sp.jumlah_produk as stock, p.harga_produk, 
                                p.komposisi, os.status as status_order, od.total_harga 
                                from orders o join order_details od on o.order_number = od.order_number 
                                join produk p on od.id_produk = p.id_produk
                                join stok_produk sp on p.id_produk = sp.id_produk
                                join order_status os on o.id_status = os.id
                                where o.id_status = 2 and o.id_customer = ${db.escape(id)} and od.id_custom_order is null`
            // console.log(get)
            const showProducts = await asyncQuery(products)
            console.log(showProducts)

            res.status(200).send(showProducts)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    paymentMethods: async (req, res) => {
        try {
            const get = `select * from opsi_pembayaran`
            const qget = await asyncQuery(get)
            res.status(200).send(qget)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)

        }
    },
    uploadPaymentProof: async (req, res) => {
        const order_number = parseInt(req.params.ordernumber)
        console.log('reqfile', req.file)
        if (!req.file) return res.status(400).send('no image !')

        const imageUpload = `images/${req.file.filename}`
        console.log('image upload', imageUpload)

        try {

            const today = new Date()
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            console.log(date)

            const pay = `UPDATE orders SET id_status = 3, bukti_bayar = '${imageUpload}', tanggal_bayar='${date}' WHERE order_number = ${order_number}`
            await asyncQuery(pay)

            res.sendStatus(200)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    detailsPaymentProof: async (req, res) => {
        const { order_number, jenis_pembayaran, email } = req.body
        try {
            const cekPayment = `select id from opsi_pembayaran where jenis_pembayaran='${jenis_pembayaran}'`
            const idPayment = await asyncQuery(cekPayment)
            console.log('id payment:', idPayment[0])

            const details = `UPDATE orders SET opsi_pembayaran =${idPayment[0].id} WHERE order_number = ${order_number}`
            await asyncQuery(details)

            // bikin invoice

            const getPaymentDetails = `select op.jenis_pembayaran, tanggal_bayar, dc.firstname, dc.lastname, o.grandTotal_checkout 
                                    from orders o join opsi_pembayaran op on o.opsi_pembayaran = op.id
                                    join data_customer dc on o.id_customer = dc.id_customer
                                    where order_number=${order_number}`

            const qgetPayment = await asyncQuery(getPaymentDetails)
            let fullname = qgetPayment[0].firstname + ' ' + qgetPayment[0].lastname
            let grandTotal_checkout = qgetPayment[0].grandTotal_checkout.toLocaleString('id-ID')
            
            const getProducts = `select p.id_produk, p.nama_produk, od.qty, od.total_harga
                                from orders o join order_details od on o.order_number = od.order_number 
                                join produk p on od.id_produk = p.id_produk
                                join stok_produk sp on p.id_produk = sp.id_produk
                                join order_status os on o.id_status = os.id
                                where o.order_number=${order_number}`
            const qgetProducts = await asyncQuery(getProducts)

            console.log(qgetProducts)

            let trProduk = ""

            // if (qgetOrders.length === 0) return res.status(200).send('customer did not buy any product')
            qgetProducts.map((item, index) => {
                trProduk += `
                ${item.nama_produk} ${item.qty}pcs Rp${item.total_harga.toLocaleString('id-ID')} \n
                `
                // <tr class="item">
                //     <td>${item.nama_produk}</td>
                //     <td>${item.qty}</td>
                //     <td>${item.total_harga}</td>
                // </tr>
            })

            const getIngredients = `select b.id_bahan_baku ,b.nama_bahan_baku, cod.total_beli_satuan, u.nama_uom, cod.total_harga
            from orders o join order_details od on o.order_number = od.order_number 
            join custom_order co on od.id_custom_order = co .id_custom_order
            join custom_order_detail cod on od.id_custom_order = cod.id_custom_order
            join bahan_baku b on cod.id_bahan_baku = b.id_bahan_baku
            join uom u on b.id_uom = u.id_uom
            join order_status os on o.id_status = os.id
            where o.order_number=${order_number}`

            const qgetIngredients = await asyncQuery(getIngredients)

            let trIngredients = ""

            qgetIngredients.map((item, index) => {
                trIngredients += `
                ${item.nama_bahan_baku} ${item.total_beli_satuan + ' ' + item.nama_uom} ${item.total_harga} \n
                `
                // <tr class="item">
                //     <td>${item.nama_bahan_baku}</td>
                //     <td>${item.total_beli_satuan + ' ' + item.nama_uom}</td>
                //     <td>${item.total_harga}</td>
                // </tr>
            })
            // item, price, qty, email, order_number, jenis_pembayaran, tanggal_bayar
            const option = {
                from: 'admin <ezrayamin16@gmail.com>',
                to: `${email}`,
                subject: `invoice #${order_number}`,
                text: ''
            }

            const emailFile = fs.readFileSync('./email/invoice.html').toString()
            const template = handlebars.compile(emailFile)
            option.html = template({
                trProduk: trProduk, trIngredients: trIngredients,
                order_number: order_number, tanggal_bayar: qgetPayment[0].tanggal_bayar, 
                jenis_pembayaran: qgetPayment[0].jenis_pembayaran,
                fullname: fullname, grandTotal_checkout: grandTotal_checkout
            })
            const info = await transporter.sendMail(option)
            res.status(200).send(info.response)

            // res.sendStatus(200)
        }
        catch (err) {
            console.log(err)
        }

    },
    getAllOrder: async (req, res) => {

        try {
            let sql = `SELECT a.*,
            b.username,
            c.status,
            i.jenis_pembayaran
            FROM orders a
            INNER JOIN data_customer AS b ON a.id_customer = b.id_customer
            INNER JOIN order_status AS c ON a.id_status = c.id
            LEFT JOIN opsi_pembayaran AS i ON a.opsi_pembayaran = i.id                    
            `
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    acceptOrderPayment: async (req, res) => {

        let id = parseInt(req.params.id)


        try {
            let sql = `UPDATE orders SET id_status = 5 WHERE order_number = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT * FROM data_customer WHERE id_customer = ${req.body.id_customer}`
            let rows2 = await asyncQuery(sql2)

            const option = {
                from: process.env.EMAIL_SEND,
                to: `${rows2[0].email}`,
                subject: 'Order Payment Accepted',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/orderPaymentAccept.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({ username: rows2[0].username, kode: id })

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')

        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    rejectOrderPayment: async (req, res) => {

        let id = parseInt(req.params.id)

        try {
            let sql = `UPDATE orders SET id_status = 8 WHERE order_number = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT * FROM data_customer WHERE id_customer = ${req.body.id_customer}`
            let rows2 = await asyncQuery(sql2)

            const option = {
                from: process.env.EMAIL_SEND,
                to: `${rows2[0].email}`,
                subject: 'Order Payment Rejected',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/orderPaymentReject.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({ username: rows2[0].username, komentar: req.body.keteranganReject, kode: id })

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')

        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    getSpecificOrderDetail: async (req, res) => {

        let orderNumber = req.params.orderNumber

        try {
            let sql = `SELECT a.*,
            b.nama_produk,
            c.kode_custom_order,
            d.nama_brand,
            e.nama_category
            FROM  order_details a 
            LEFT JOIN produk AS b ON a.id_produk = b.id_produk
            LEFT JOIN custom_order AS c ON a.id_custom_order = c.id_custom_order
            LEFT JOIN brands AS d ON b.id_brand = d.id_brand
            LEFT JOIN category AS e ON b.id_kategori = e.id_category
            WHERE order_number = ${orderNumber}
            GROUP BY id_details
            `
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    }
}


///BARANGSIAPA YANG HAPUS INI AKAN SIAL SEUMUR HIDUP////
// SELECT a.*,
//             b.username,
//             c.status,
//             d.qty,d.total_harga,
//             e.nama_produk,e.kode_produk,e.harga_produk,
//             f.nama_brand,
//             g.nama_category,
//             h.kode_custom_order,
//             i.jenis_pembayaran
//             FROM orders a
//             INNER JOIN data_customer AS b ON a.id_customer = b.id_customer
//             INNER JOIN order_status AS c ON a.id_status = c.id
//             INNER JOIN order_details AS d ON a.order_number = d.order_number
//             INNER JOIN produk AS e ON d.id_produk = e.id_produk
//             INNER JOIN brands AS f ON e.id_brand = f.id_brand
//             INNER JOIN category AS g ON e.id_kategori = g.id_category
//             LEFT JOIN custom_order AS h ON d.id_custom_order = h.id_custom_order
//             LEFT JOIN opsi_pembayaran AS i ON a.opsi_pembayaran = i.id 
