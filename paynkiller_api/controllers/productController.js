const {
    asyncQuery,
    generateQueryBody
} = require('../helpers/queryHelp')

module.exports = {
    getProducts: async (req, res) => {
        try {
            let sql = 'SELECT a.*, b.`nama_brand`, c.`nama_category` FROM produk a INNER JOIN brands AS b ON a.`id_brand` = b.`id_brand` INNER JOIN category AS c ON a.`id_kategori` = c.`id_category`'
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    addProduct: async (req,res) => {
        
        const {nama_produk, harga_produk, indikasi_umum, komposisi, aturan_pakai, keterangan_obat, id_brand, id_kategori} = req.body
        

        let generateCode = Math.random().toString(36).substring(7)
        let codeKapital = generateCode.toUpperCase()
        let hari = new Date()
        let day = hari.getDate()
        let bulan = hari.getMonth()
        let tahun = hari.getFullYear()
        let finalCode = `PRD-${tahun}${bulan}${day}-${codeKapital}`


        try{
            let sql = `SELECT * from produk WHERE nama_produk = '${nama_produk}'`
            let rows = await asyncQuery(sql)

            if(rows.length) return res.status(400).send('Produk sudah ada')

            let sql2 = `INSERT INTO produk (nama_produk, harga_produk, indikasi_umum, komposisi, aturan_pakai, keterangan_obat, id_brand, id_kategori, kode_produk)
            VALUES ('${nama_produk}',${harga_produk},'${indikasi_umum}','${komposisi}','${aturan_pakai}','${keterangan_obat}',${id_brand},${id_kategori},'${finalCode}')
            `
            let rows2 = await asyncQuery(sql2)

            res.status(200).send('Tambah Produk Berhasil')

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    uploadGambarProduct: async(req,res) => {
        const id = parseInt(req.params.id)

        let imageUpload = `images/${req.file.filename}`

        if(!req.file) return res.status(400).send('no image !')

        try{
            let sql = `UPDATE produk SET gambar_obat = '${imageUpload}' WHERE id_produk = ${id}`
            let rows = await asyncQuery(sql)

            res.status(200).send('Upload Gambar Berhasil')

        }   
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getMaxId: async(req,res) => {
        try{
            let sql = `SELECT MAX(id_produk) AS id_max FROM produk`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows[0])

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editProduct: async(req,res) => {

        let id_product = parseInt(req.params.id)
        const {kode_produk, nama_produk, harga_produk, indikasi_umum, komposisi, aturan_pakai, keterangan_obat, id_brand, id_kategori} = req.body

        try{
            let sql = `UPDATE produk set ${generateQueryBody(req.body)} WHERE id_produk = ${id_product}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Update Produk telah berhasil")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteProduct: async(req,res) => {
        let id_product = parseInt(req.params.id)

        try{
            let sql = `DELETE FROM produk WHERE id_produk = ${id_product}`
            let rows = await asyncQuery(sql)

            let checksql = `SELECT * FROM stok_produk WHERE id_produk = ${id_product}`
            let rowscheck = await asyncQuery(checksql)

            if(rowscheck.length){
                let sql2 = `DELETE FROM stok_produk WHERE id_produk = ${id_product}`
                let rows2 = await asyncQuery(sql2)
            }

            res.status(200).send("Delete Berhasil !")

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    searchProduct: async(req,res) => {
        let id_produk = parseInt(req.params.id)

        try{
            let sql = `SELECT * FROM produk WHERE id_produk = ${id_produk}`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}