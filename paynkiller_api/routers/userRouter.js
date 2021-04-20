const router = require('express').Router()
const {body} = require('express-validator')
const {userController} = require('../controllers')
const {verifyToken} = require('../helpers/jwt')

const passValidation = [
    body('password')
    .isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,})
    .withMessage('password not strong (use symbol (!#$%^&*()_+=:;?/.><,~`) ex: ExamplePassword2!)')
]

const registerValidation = [
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
    body('email')
    .isEmail()
    .withMessage('invalid email') 
]

router.post('/register', registerValidation, userController.register)
router.post('/login',userController.login)
router.post('/keeplogin', verifyToken, userController.keeplogin)
router.post('/forgotPass', userController.forgotPass)
router.post('/changepass', passValidation, verifyToken, userController.changePass)
router.post('/showProfile', verifyToken, userController.showProfile)
router.patch('/editProfile/:idcustomer', userController.editProfile)
router.post('/verify', verifyToken, userController.emailVerification)
router.post('/resendVerification', userController.resendEmail)
module.exports = router