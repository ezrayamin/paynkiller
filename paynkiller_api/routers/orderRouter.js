const router = require('express').Router()
const {verifyToken} = require('../helpers/jwt')
const {orderController} = require('../controllers')
const {upload} = require('../helpers/multer')
const uploader = upload()

router.post('/addCart/:idcustomer', orderController.addToCart)
router.get('/userCart/:idcustomer', orderController.getCartUser)
router.patch('/editQty', orderController.editQty)
router.delete('/delete/:iddetails', orderController.delete)
router.patch('/toCheckout', orderController.checkoutFromCart)
router.get('/ordersCheckout/:idcustomer', orderController.ordersCheckout)
router.get('/paymentMethods', orderController.paymentMethods)
router.post('/paymentProof/:ordernumber', uploader, orderController.uploadPaymentProof)
router.post('/detailsPayment', orderController.detailsPaymentProof)
router.get('/getallorder', orderController.getAllOrder)
router.post('/getorderdetailspecific/:orderNumber', orderController.getSpecificOrderDetail)
router.post('/acceptpayment/:id', orderController.acceptOrderPayment)
router.post('/rejectpayment/:id', orderController.rejectOrderPayment)


module.exports = router