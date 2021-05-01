
const {asyncQuery,generateQueryBody} = require('../helpers/queryHelp')

module.exports = {
    getBrands: async(req,res) => {
        try{
            let sql = `SELECT * FROM brands where id_status = 1`
            let rows =  await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }       
    },
    searchBrand: async(req,res) => {        
        let id_brand = parseInt(req.params.id)

        try{
            let sql = `SELECT * FROM brands WHERE id_brand = ${id_brand} and id_status = 1`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addBrand: async(req,res) => {

        let {nama_brand, kode_brand } = req.body

        try{
            let sql = `SELECT * FROM brands WHERE nama_brand = '${nama_brand}' OR kode_brand = '${kode_brand}' having id_status = 1`
            let rows = await asyncQuery(sql)

            if(rows.length === 1) return res.status(400).send(`${nama_brand || kode_brand} has already exist`)

            let sql2 = `INSERT INTO brands (nama_brand,kode_brand) VALUES ('${nama_brand}','${kode_brand}')`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send(rows2)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteBrand: async(req,res) => {
        let id_brand = parseInt(req.params.id)

        try{
            let sql = `UPDATE brands SET id_status = 3 WHERE id_brand = ${id_brand}`
            await asyncQuery(sql)

            res.sendStatus(200)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }

    },
    editBrand: async(req,res) => {
        let id_brand = parseInt(req.params.id)
        let {nama_brand, kode_brand } = req.body

        try{
            // let sql = `SELECT * FROM brands WHERE nama_brand = '${nama_brand}' OR kode_brand = '${kode_brand}' having id_status = 1 `
            // let rows = await asyncQuery(sql)

            // if(rows.length === 1) return res.status(400).send(`${nama_brand || kode_brand} has already exist`)

            let sql2 = `UPDATE brands SET ${generateQueryBody(req.body)} WHERE id_brand = ${id_brand}`
            await asyncQuery(sql2)

            res.sendStatus(200)

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}