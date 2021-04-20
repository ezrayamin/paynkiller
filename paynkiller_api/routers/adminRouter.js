const router = require('express').Router()
const {adminController} = require('../controllers')
const {body} = require('express-validator')
const {verifyToken,verifyTokenAdmin} = require('../helpers/jwt')


const addAdminValidation = [
    body('username')
    .notEmpty()
    .withMessage('username cannot be empty')
    .isLength({min: 6})
    .withMessage('username must have 6 characters or more'),
    body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({min: 8})
    .withMessage('password must have 8 characters or more') 
    .matches(/[0-9]/)
    .withMessage('password must include a number & a symbol') 
    .matches(/[?><:;"'.,!@#$%^*]/)
    .withMessage('password must include a number & a symbol'),
]

router.get('/admins',adminController.getAdmin)
router.post('/loginadmin',adminController.login)
router.post('/adminadd',addAdminValidation,adminController.tambahAdmin)
router.post('/editadmin/:id',adminController.editAdmin)
router.post('/deactiveaccount/:id', adminController.deactiveAccount)
router.post('/keeplogin', verifyTokenAdmin, adminController.keeplogin)


module.exports = router