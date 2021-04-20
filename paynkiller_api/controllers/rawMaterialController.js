const {
    asyncQuery,
    generateQueryBody
} = require('../helpers/queryHelp')

module.exports = {
    getRawMaterial: async(req,res) => {
        try{
            let sql = `SELECT a.*, b.nama_uom FROM bahan_baku a
            LEFT JOIN uom AS b ON a.id_uom = b.id_uom`
            let rows =  await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addRawMaterial: async(req,res) => {

        let {nama_bahan_baku, harga_bahan_baku, deskripsi_bahan, total_kapasitas, id_uom} = req.body

        let generateCode = Math.random().toString(36).substring(7)
        let codeKapital = generateCode.toUpperCase()
        let hari = new Date()
        let day = hari.getDate()
        let bulan = hari.getMonth()
        let tahun = hari.getFullYear()
        let kode_bahan_baku = `RM-${tahun}${bulan}${day}-${codeKapital}`

        try{
            let sql = `SELECT * FROM bahan_baku WHERE nama_bahan_baku = '${nama_bahan_baku}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 1) return res.status(400).send("Bahan baku sudah ada !")

            let sql2 = `INSERT INTO bahan_baku (nama_bahan_baku,harga_bahan_baku,kode_bahan_baku,deskripsi_bahan,total_kapasitas,id_uom) VALUES ('${nama_bahan_baku}',${harga_bahan_baku},'${kode_bahan_baku}','${deskripsi_bahan}',${total_kapasitas},${id_uom})`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send(rows2)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editRawMaterial: async(req,res) => {

        let id_bahan_baku = parseInt(req.params.id)
        let {nama_bahan_baku, harga_bahan_baku, deskripsi_bahan, total_kapasitas, id_uom} = req.body

        try{
            let sql = `UPDATE bahan_baku set ${generateQueryBody(req.body)} WHERE id_bahan_baku = ${id_bahan_baku}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT a.*,
            b.kode_bahan_baku,b.nama_bahan_baku,b.harga_bahan_baku,b.deskripsi_bahan,b.total_kapasitas,
            c.nama_uom
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom
            WHERE id_bahan = ${id_bahan_baku}`
            let rows2 = await asyncQuery(sql2)

            if(rows2.length){
                let total_bahan = rows2[0].jumlah_botol*rows2[0].total_kapasitas
    
                let sql3 = `UPDATE stok_bahan_baku set 
                total_bahan = ${total_bahan}
                WHERE id_stok_bahan = ${rows2[0].id_stok_bahan}`
                let rows3 = await asyncQuery(sql3)
            }

            res.status(200).send("Update Produk telah berhasil")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteRawMaterial: async(req,res) => {
        let id_bahan_baku = parseInt(req.params.id)
        
        try{
            let sql = `DELETE FROM bahan_baku WHERE id_bahan_baku = ${id_bahan_baku}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT * FROM stok_bahan_baku WHERE id_bahan = ${id_bahan_baku}`
            let rows2 = await asyncQuery(sql2)

            if(rows2.length){
                let sql3 = `DELETE FROM stok_bahan_baku WHERE id_bahan = ${id_bahan_baku}`
                let rows3 = await asyncQuery(sql3)
            }

            res.status(200).send("Delete Berhasil !")

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    searchRawMaterial: async(req,res) => {
        let id_bahan_baku = parseInt(req.params.id)

        try{
            let sql = `SELECT * FROM bahan_baku WHERE id_bahan_baku = ${id_bahan_baku}`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}