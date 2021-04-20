const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')
const transporter = require('../helpers/nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

module.exports = {
    userHistory: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const sql = `SELECT o.order_number, o.grandTotal_checkout,o.keterangan, o.tanggal_transaksi, o.tanggal_bayar, dc.email, os.status, op.jenis_pembayaran, o.id_status
                         FROM orders o
                         INNER JOIN data_customer AS dc ON o.id_customer = dc.id_customer
                         INNER JOIN order_status os ON o.id_status = os.id
                         LEFT JOIN opsi_pembayaran op ON op.id = o.opsi_pembayaran
                         WHERE o.id_customer = ${db.escape(id)}`
            const hasil = await asyncQuery(sql)
            const data = [{
                id_status: 8
            }]
            res.status(200).send(hasil)
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    getDetailHistory: async (req, res) => {
        const orderNumber = req.params.orderNumber

        try {
            const sql = `SELECT od.total_harga, od.qty, p.nama_produk, co.kode_custom_order, b.nama_brand, c.nama_category
                         FROM  order_details od 
                         LEFT JOIN produk AS p ON od.id_produk = p.id_produk
                         LEFT JOIN custom_order AS co ON od.id_custom_order = co.id_custom_order
                         LEFT JOIN brands AS b ON p.id_brand = b.id_brand
                         LEFT JOIN category AS c ON p.id_kategori = c.id_category
                         WHERE order_number = ${db.escape(orderNumber)}
                         GROUP BY id_details`
            const hasil = await asyncQuery(sql)
            res.status(200).send(hasil)
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    reuploadBuktiTransaksi: async (req, res) => {
        const ordernumber = req.params.orderNumber
        if (!req.file) return res.status(400).send('No Image Uploaded')

        const imageUpload = `images/${req.file.filename}`
        try {
            const today = new Date()
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            console.log(date)

            const pay = `UPDATE orders SET id_status = 3, bukti_bayar = '${imageUpload}', tanggal_bayar='${date}' WHERE order_number = ${ordernumber}`
            await asyncQuery(pay)
            res.status(200).send('Your Transaction Evidence has been Re-Upload')
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    cancelOrders: async (req, res) => {
        const order_number = req.params.orderNumber
        const { email, total_bayar } = req.body
        console.log(email, total_bayar)
        try {
            const getOrders = `select b.id_bahan_baku ,b.nama_bahan_baku, sum(distinct cod.total_beli_satuan) as total_beli_satuan, sum(distinct sbk.total_bahan ) as total_bahan
            from orders o join order_details od on o.order_number = od.order_number 
            join custom_order co on od.id_custom_order = co .id_custom_order
            join custom_order_detail cod on od.id_custom_order = cod.id_custom_order
            join bahan_baku b on cod.id_bahan_baku = b.id_bahan_baku
            join order_status os on o.id_status = os.id
            join stok_bahan_baku sbk on b.id_bahan_baku = sbk.id_bahan
            where o.order_number=${order_number}
            group by b.id_bahan_baku`
            const qgetOrders = await asyncQuery(getOrders)
            qgetOrders.map(async (item, index) => {
                try {
                    let updateCancel1 = `UPDATE stok_bahan_baku SET total_bahan = '${parseFloat(item.total_bahan + item.total_beli_satuan)}' WHERE id_bahan = '${item.id_bahan_baku}'`
                    await asyncQuery(updateCancel1)
                    let checkBahanbaku = `SELECT bb.total_kapasitas, sbk.total_bahan, sbk.jumlah_botol, sbk.id_bahan FROM bahan_baku bb
                    LEFT JOIN stok_bahan_baku sbk ON sbk.id_bahan = bb.id_bahan_baku
                                          WHERE sbk.id_bahan = '${item.id_bahan_baku}'`
                    let hasilcheck2 = await asyncQuery(checkBahanbaku)
                    hasilcheck2.map(async (it, id) => {
                        try {
                            let botol = it.jumlah_botol
                            let kapasitasTemp = parseInt(it.total_kapasitas * botol)
                            let hasilTemp = parseFloat(it.total_bahan - kapasitasTemp)
                            if (hasilTemp >= 0.1 && hasilTemp <= it.total_kapasitas) {
                                botol += 1
                                let updateBotol = `UPDATE stok_bahan_baku SET jumlah_botol = '${botol}' WHERE id_bahan = '${it.id_bahan}'`
                                await asyncQuery(updateBotol)
                            }
                        }
                        catch (err) {
                            res.status(400).send(err)
                        }
                    })
                }
                catch (err) {
                    res.status(400).send(err)
                }
            })
            console.log('tralalalala')
            let checkStokProduk = `SELECT sp.id_produk, sp.jumlah_produk, od.qty FROM stok_produk sp
                                   LEFT JOIN order_details od ON od.id_produk = sp.id_produk
                                   WHERE od.order_number = '${order_number}'`
            let hasilchekproduk = await asyncQuery(checkStokProduk)
            console.log(hasilchekproduk)
            if (hasilchekproduk.length >= 0) {
                hasilchekproduk.map(async (itm, idx) => {
                    try {
                        let updateStokProduk = `UPDATE stok_produk SET jumlah_produk = '${itm.jumlah_produk + itm.qty}' WHERE id_produk = '${itm.id_produk}'`
                        await asyncQuery(updateStokProduk)
                    }
                    catch (err) {
                        console.log(err)
                    }
                })
            }
            const sql = `SELECT * FROM data_customer WHERE email = '${email}'`
            const rows = await asyncQuery(sql)

            let username = rows[0].username
            console.log(username)

            const option = {
                from: process.env.EMAIL_SEND,
                to: email,
                subject: 'Order Cancelled',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }
            const fileEmail = fs.readFileSync('./file_email/cancelOrder.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({ total_refund: total_bayar.toLocaleString(), nama: username })
            await transporter.sendMail(option)

            const update_status = `UPDATE orders SET id_status = 7 WHERE order_number = '${order_number}'`
            await asyncQuery(update_status)
            res.status(200).send('Your Order Canceled')
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    confirmArrived: async (req, res) => {
        const order_number = req.params.orderNumber
        const { email, id_status } = req.body
        try {
            const sqlOrder = `SELECT o.order_number, o.grandTotal_checkout,o.keterangan, o.tanggal_transaksi, o.tanggal_bayar, dc.email, os.status, op.jenis_pembayaran, o.id_status
            FROM orders o
            INNER JOIN data_customer AS dc ON o.id_customer = dc.id_customer
            INNER JOIN order_status os ON o.id_status = os.id
            LEFT JOIN opsi_pembayaran op ON op.id = o.opsi_pembayaran
            WHERE o.order_number = '${order_number}' AND o.id_status = '${id_status}'`
            const hasil = await asyncQuery(sqlOrder)
            const data = hasil[0]
            console.log(data)

            const sql = `SELECT * FROM data_customer WHERE email = '${email}'`
            const rows = await asyncQuery(sql)

            console.log(email)

            let username = rows[0].username
            console.log(username)

            const option = {
                from: process.env.EMAIL_SEND,
                to: email,
                subject: 'Thanks For The Confirmation',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid: 'paynkiller'
                }],
            }
            const fileEmail = fs.readFileSync('./file_email/arrivedConfirmed.html').toString()
            console.log(fileEmail)
            const template = handlebars.compile(fileEmail)
            console.log(template)
            option.html = template({
                total_bayar: data.grandTotal_checkout,
                nama: username,
                keterangan: data.keterangan,
                tanggal_transaksi: data.tanggal_transaksi,
                tanggal_bayar: data.tanggal_bayar,
                data_status: data.status,
                jenis_pembayaran: data.jenis_pembayaran,
                nomor_order: order_number
            })
            console.log('ulala', option.html)
            const info = await transporter.sendMail(option)
            console.log(info)

            const update_status = `UPDATE orders SET id_status = 4 WHERE order_number = '${order_number}'`
            await asyncQuery(update_status)
            res.status(200).send('Your Order Has Been Confirmed')
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
}