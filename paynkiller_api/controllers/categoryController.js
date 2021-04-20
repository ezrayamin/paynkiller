const {asyncQuery, generateQueryBody} = require('../helpers/queryHelp')

module.exports = {
    getAllCate: async (req, res) => {
        try {
            const queryCate = 'SELECT * FROM category'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    add: async (req, res) => {
        const {isi} = req.body
        try {
            const addQuery = `INSERT INTO category (nama_category) VALUES ('${isi}')`
            await asyncQuery(addQuery)

            const queryCate = 'SELECT * FROM category'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    delete: async (req, res) => {
        try {
            const deleteQuery = `DELETE FROM category WHERE id_category = ${parseInt(req.params.id)}`
            await asyncQuery(deleteQuery)

            const queryCate = 'SELECT * FROM category'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editCate: async (req , res) => {
        try {
            const editQuery = `UPDATE category SET${generateQueryBody(req.body)} where id_category = ${parseInt(req.params.id)}`
            await asyncQuery(editQuery)

            const queryCate = 'SELECT * FROM category'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    topNode: async (req , res) => {
        try {
            const nodeQuery = 'SELECT id_category, nama_category FROM category WHERE parent_id IS NULL'
            const result = await asyncQuery(nodeQuery)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
}