const {createToken} = require('../helpers/jwt')
const {asyncQuery} = require('../helpers/queryHelp')

const { validationResult } = require('express-validator')

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async(req,res) => {

        let username = req.body.username
        let password = req.body.password
        
        try{
            let sql = `SELECT * FROM data_admin WHERE username = '${username}' `
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Username salah !")

            if(rows[0].status != 1) return res.status(400).send("Akun tidak aktif !")

            let hash = rows[0].password

            let hasil = await bcrypt.compare(password, hash)
            
            if(hasil === false) return res.status(400).send("Password salah !")
            
            const token = createToken({
                username: rows[0].username,
                id_admin: rows[0].id_admin
            })

            let data = {
                username: rows[0].username,
                id_customer: rows[0].id_customer
            }

            data.token = token

            res.status(200).send(data)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    tambahAdmin: async(req,res) => {
        let username = req.body.username
        let password = req.body.password

        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        let hashedPass = bcrypt.hashSync(password, salt)

        try{
            let sql = `SELECT * FROM data_admin WHERE username = '${username}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 1) return res.status(400).send("Data admin sudah ada !")

            let sql2 = `INSERT INTO data_admin (username,password,status) VALUES ('${username}','${hashedPass}',1)`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send(rows2)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editAdmin: async(req,res) => {
        let id_admin = parseInt(req.params.id)

        let status = req.body.status
        let username = req.body.username
        let password = bcrypt.hashSync(req.body.password, salt)

        let body = {username,password,status}

        try{
            let sql = `UPDATE data_admin set${generateQueryBody(body)} WHERE id_admin = ${id_admin}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Update Berhasil !")
            
        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getAdmin: async(req,res) => {
        try{
            let sql = 'SELECT a.*,b.`nama_status` FROM data_admin a INNER JOIN admin_status AS b ON a.`status` = b.`id_status`'
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deactiveAccount: async(req,res) => {
        
        let id_admin = req.params.id
        
        try{
            let sql = `UPDATE data_admin SET status = 2 WHERE id_admin = ${id_admin}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Akun telah dinonaktifkan")

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    keeplogin : async(req, res) => {   
        const {username} = req.user
        try{
            const sql = `SELECT * FROM data_admin WHERE username = '${username}' `
            const rows = await asyncQuery(sql)
            const data = {
                username: rows[0].username,
            }
            res.status(200).send(data)
        }
        catch(err){
            res.status(400).send('error' + err)
        }
    },
}