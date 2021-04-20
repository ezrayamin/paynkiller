const db = require('../database')

const { asyncQuery, generateQuery } = require('../helpers/queryHelp')

module.exports = {
    produk: async (req, res) => {
        const { id } = req.query
        console.log(id)
        try {
            const sql = `SELECT p.id_produk, p.nama_produk, p.harga_produk, p.indikasi_umum, p.komposisi, p.aturan_pakai, p.keterangan_obat, p.gambar_obat, b.nama_brand, c.nama_category, sp.jumlah_produk FROM produk p
                         LEFT JOIN brands b ON p.id_brand = b.id_brand
                         LEFT JOIN category c ON p.id_kategori = c.id_category
                         LEFT JOIN stok_produk sp on p.id_produk = sp.id_produk
                         WHERE p.id_produk = ${id}`
            const rows = await asyncQuery(sql)
            res.status(200).send(rows)
        }
        catch (err) {
            res.starus(400).send('error' + err)
        }
    }
}

