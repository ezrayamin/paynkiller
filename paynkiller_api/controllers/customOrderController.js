const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')
const transporter = require('../helpers/nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')


module.exports = {
    customOrder: async (req, res) => {
        const id = parseInt(req.params.id)

        if (!req.file) return res.status(400).send('No Image Uploaded')
        let imageUpload = `images/${req.file.filename}`

        let generateCode = Math.random().toString(36).substring(7)
        let codeKapital = generateCode.toUpperCase()
        let hari = new Date()
        let day = hari.getDate()
        let bulan = hari.getMonth()
        let tahun = hari.getFullYear()
        let finalCode = `CO-${tahun}${bulan}${day}-${codeKapital}`
        try {
            const sql = `INSERT INTO custom_order (gambar_resep, id_user, status, kode_custom_order) VALUES ('${imageUpload}', '${id}', 1, '${finalCode}')`
            await asyncQuery(sql)

            res.status(200).send('Your Medical Prescription has been Uploaded')
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    getCustomOrder: async (req, res) => {
        try {
            let sql = `SELECT a.*,
            b.username,b.email,
            c.nama_status_custom_order 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            INNER JOIN status_custom_order AS c ON a.status = c.id_status_custom_order`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    getCustomOrderDetail: async (req, res) => {
        let id = req.params.id

        try {
            let sql = `SELECT a.*,
            b.kode_bahan_baku,b.nama_bahan_baku,b.harga_bahan_baku,b.total_kapasitas,
            c.nama_uom
            FROM custom_order_detail AS a
            INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom
            WHERE id_custom_order = ${id}
            `
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    acceptOrder: async (req, res) => {
        let id = req.params.id

        try {
            let sql = `UPDATE custom_order SET status = 2 WHERE id_custom_order = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT a.*,
            b.username,b.email 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            WHERE id_custom_order = ${id}`
            let rows2 = await asyncQuery(sql2)

            console.log(rows2[0].email)

            const option = {
                from: process.env.EMAIL_SEND,
                to: `${rows2[0].email}`,
                subject: 'Custom Order Accepted',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/customOrderAccept.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({ username: rows2[0].username })

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')

        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    rejectedOrder: async (req, res) => {
        let id = req.params.id

        try {
            let sql = `UPDATE custom_order SET status = 3 WHERE id_custom_order = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT a.*,
            b.username,b.email 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            WHERE id_custom_order = ${id}`
            let rows2 = await asyncQuery(sql2)

            console.log(rows2[0].email)

            const option = {
                from: process.env.EMAIL_SEND,
                to: `${rows2[0].email}`,
                subject: 'Custom Order Accepted',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/customOrderReject.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({ username: rows2[0].username, keterangan: req.body.keterangan })

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')


        } catch (err) {
            res.status(400).send(err)
        }
    },
    addCustomOrderDetail: async (req, res) => {

        let id = parseInt(req.params.id)

        let idBahan = parseInt(req.body.idBahanBaku)
        let jumlahBeli = parseFloat(req.body.kuantitasBahan)

        try {
            let sql = `SELECT a.*,
            b.harga_bahan_baku
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            WHERE id_bahan = ${idBahan}`
            let rows = await asyncQuery(sql)

            let hargaBahanBaku = parseFloat(rows[0].harga_bahan_baku)

            if (jumlahBeli > 0 && jumlahBeli < 1) {
                jumlahBeli = Math.ceil(jumlahBeli)
            } else {
                jumlahBeli = Math.round(jumlahBeli)
            }

            let totalHarga = parseFloat(jumlahBeli * hargaBahanBaku)

            console.log(`${jumlahBeli} * ${hargaBahanBaku} = ${totalHarga}`)

            let sql2 = `INSERT INTO custom_order_detail (id_custom_order,id_bahan_baku,total_beli_satuan,total_harga) VALUES (${id},${idBahan},${parseFloat(req.body.kuantitasBahan)},${totalHarga})`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send("Insert Data Berhasil")

        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    addCustomOrderToCart: async (req, res) => {
        let id = parseInt(req.params.id)

        const { id_custom_order } = req.body

        try {
            let cek = `SELECT * FROM orders WHERE id_customer = ${id} AND id_status = 1`
            let qcek = await asyncQuery(cek)

            let current_order_number = qcek.length !== 0 ? qcek[0].order_number : Date.now()

            if (qcek.length === 0) {

                const addOrders = `INSERT INTO orders (order_number, id_customer, id_status) VALUES
                (${current_order_number}, ${id}, 1)`
                await asyncQuery(addOrders)

                let totalSum = `SELECT SUM(a.total_harga) AS grandTotal
                FROM custom_order_detail AS a
                INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
                INNER JOIN uom AS c ON b.id_uom = c.id_uom
                WHERE id_custom_order = ${id_custom_order}`
                let rowSum = await asyncQuery(totalSum)

                let grandTotal = parseFloat(rowSum[0].grandTotal)
                console.log(grandTotal)

                let queryInsert = `INSERT INTO order_details (order_number,id_produk,id_custom_order,qty,total_harga) VALUES (${current_order_number},0,${id_custom_order},1,${grandTotal})`
                let rowsQueryInsert = await asyncQuery(queryInsert)

            } else {
                let totalSum2 = `SELECT SUM(a.total_harga) AS grandTotal
                FROM custom_order_detail AS a
                INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
                INNER JOIN uom AS c ON b.id_uom = c.id_uom
                WHERE id_custom_order = ${id_custom_order}`
                let rowSum2 = await asyncQuery(totalSum2)

                let grandTotal2 = parseFloat(rowSum2[0].grandTotal)

                let queryInsert2 = `INSERT INTO order_details (order_number,id_produk,id_custom_order,qty,total_harga) VALUES (${current_order_number},0,${id_custom_order},1,${grandTotal2})`
                let rowsQueryInsert2 = await asyncQuery(queryInsert2)
            }

            let changeStatus = `UPDATE custom_order set status = 4 WHERE id_custom_order = ${id_custom_order} `
            let rowsChangeStatus = await asyncQuery(changeStatus)

            res.status(200).send("Custom Order berhasil ditambah !")

        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    addNewOrder: async (req, res) => {
        const id_customer = parseInt(req.params.idcustomer)
        const { total_harga } = req.body
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

            let generateCode = Math.random().toString(36).substring(7)
            let codeKapital = generateCode.toUpperCase()
            let finalCode = `CO-${tahun}${bulan}${day}-${codeKapital}`

            const addCO = `INSERT INTO custom_order (kode_custom_order, id_user, status) VALUES ('${finalCode}', '${id_customer}', 4)`
            const qAddCO = await asyncQuery(addCO)

            const priceOD = `SELECT SUM(total_harga) as total_harga from custom_order_detail WHERE id_custom_order=${qAddCO.insertId}`
            const getPriceOD = await asyncQuery(priceOD)
            console.log(getPriceOD)

            const addOD = `INSERT INTO order_details (order_number, id_custom_order, total_harga) VALUES 
                          (${current_order_number}, ${qAddCO.insertId}, ${total_harga})`
            await asyncQuery(addOD)

            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    addMaterialsToCart: async (req, res) => {
        const id_customer = parseInt(req.params.idcustomer)
        const { order_number, id_bahan_baku, qty, total_harga } = req.body
        console.log(req.body)
        try {
            const get = `select od.id_custom_order from orders o left join order_details od on o.order_number = od.order_number 
                        where o.id_customer=${id_customer} and o.id_status=1 and od.id_custom_order is not null;`
            const qget = await asyncQuery(get)
            console.log('a', qget)
            console.log('b', qget[0])
            console.log('id customorder', qget[0].id_custom_order)
            
            const id_custom_order = qget[0].id_custom_order
            const addCOD = `INSERT INTO custom_order_detail (id_custom_order, id_bahan_baku, total_beli_satuan, total_harga) VALUES
                            (${id_custom_order}, ${id_bahan_baku}, ${qty}, ${total_harga})`
            await asyncQuery(addCOD)

            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    getMaterialsCart: async (req, res) => {
        const id = parseInt(req.params.idcustomer)
        const get = `select o.order_number, o.id_customer, b.nama_bahan_baku, co.kode_custom_order, cod.total_beli_satuan, u.nama_uom, cod.total_harga, os.status as status_order
                    from orders o join order_details od on o.order_number = od.order_number 
                    join custom_order co on od.id_custom_order = co .id_custom_order
                    join custom_order_detail cod on od.id_custom_order = cod.id_custom_order
                    join bahan_baku b on cod.id_bahan_baku = b.id_bahan_baku
                    join order_status os on o.id_status = os.id
                    JOIN uom u ON b.id_uom = u.id_uom
                    where o.id_customer =${id} and o.id_status=1;`
        // console.log(get)
        const qget = await asyncQuery(get)
        res.status(200).send(qget)
    },
    // (COMMENT INI TOLONG JANGAN DIHAPUS)
    // bring materials to checkout udah included di orderController 
    materialsCheckout: async (req, res) => {
        const id = parseInt(req.params.idcustomer)
        console.log('id customer produk', id)
        try {
            const materials = `select o.order_number, o.id_customer, b.id_bahan_baku ,b.nama_bahan_baku, co.id_custom_order, 
                            cod.total_beli_satuan, u.nama_uom, cod.total_harga, os.status as status_order
                            from orders o join order_details od on o.order_number = od.order_number 
                            join custom_order co on od.id_custom_order = co .id_custom_order
                            join custom_order_detail cod on od.id_custom_order = cod.id_custom_order
                            join bahan_baku b on cod.id_bahan_baku = b.id_bahan_baku
                            join order_status os on o.id_status = os.id
                            JOIN uom u ON b.id_uom = u.id_uom
                            where o.id_customer =${id} and o.id_status=2 and od.id_custom_order is not null;`
            const showMaterials = await asyncQuery(materials)
            console.log(showMaterials)
            res.status(200).send(showMaterials)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    showCustomOrder: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const sql = `SELECT co.id_custom_order, co.gambar_resep, co.kode_custom_order, soc.nama_status_custom_order as status FROM custom_order co
                         LEFT JOIN status_custom_order soc ON co.status = soc.id_status_custom_order
                         WHERE co.id_user = ${db.escape(id)};`
            const rows = await asyncQuery(sql)

            res.status(200).send(rows)
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
}