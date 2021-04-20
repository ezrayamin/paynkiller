const nodemailer = require('nodemailer')
const NODEMAILER = process.env.NODEMAILER
const USER = process.env.USER

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: USER,
        pass: NODEMAILER
    },
    tls : {
        rejectUnauthorized : true
    }
})

module.exports = transporter