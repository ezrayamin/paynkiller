const router = require('express').Router()
const {upload} = require('../helpers/multer')
const uploader = upload() 
const {userHistoryController} = require('../controllers')

router.get('/userHistory/:id', userHistoryController.userHistory)
router.get('/getDetailHistory/:orderNumber', userHistoryController.getDetailHistory)
router.post('/cancelOrder/:orderNumber', userHistoryController.cancelOrders)
router.post('/confirmArrived/:orderNumber', userHistoryController.confirmArrived)
router.post('/reupload/:orderNumber',uploader, userHistoryController.reuploadBuktiTransaksi)

module.exports = router