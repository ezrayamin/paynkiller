
const {asyncQuery,generateQueryBody} = require('../helpers/queryHelp')

module.exports = {
    getUoms: async(req,res) => {
        try{
            let sql = `SELECT * FROM uom `
            let rows =  await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }       
    },
    searchUom: async(req,res) => {        
        let id_uom = parseInt(req.params.id)

        try{
            let sql = `SELECT * FROM uom WHERE id_uom = ${id_uom} `
            let rows = await asyncQuery(sql)

            res.status(200).send(rows[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addUom: async(req,res) => {

        let {nama_uom, keterangan } = req.body

        try{
            let sql = `SELECT * FROM uom WHERE nama_uom = '${nama_uom}' `
            let rows = await asyncQuery(sql)

            if(rows.length === 1) return res.status(400).send("Data Sudah Ada")

            let sql2 = `INSERT INTO uom (nama_uom,keterangan) VALUES ('${nama_uom}','${keterangan}')`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send(rows2)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteUom: async(req,res) => {
        let id_uom = parseInt(req.params.id)

        try{
            let sql = `DELETE FROM uom WHERE id_uom = ${id_uom}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Delete Berhasil !")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }

    },
    editUom: async(req,res) => {
        let id_uom = parseInt(req.params.id)
        let {nama_uom, keterangan } = req.body

        try{

            let checkQuery = `SELECT * FROM uom WHERE nama_uom = '${nama_uom}' `
            let checkRows = await asyncQuery(checkQuery)

            if(checkRows.length === 1) return res.status(400).send("Data Sudah Ada")

            let sql = `UPDATE uom set${generateQueryBody(req.body)} WHERE id_uom = ${id_uom}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Update Berhasil !")

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}