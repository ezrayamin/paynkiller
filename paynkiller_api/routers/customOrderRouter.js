const router = require('express').Router()
const {upload} = require('../helpers/multer')
const uploader = upload() 
const {customOrderController} = require('../controllers')


router.post('/customOrder/:id', uploader, customOrderController.customOrder)
router.get('/getall',customOrderController.getCustomOrder)
router.get('/getcustomorderdetail/:id', customOrderController.getCustomOrderDetail)
router.post('/customorderacc/:id', customOrderController.acceptOrder)
router.post('/customordernoacc/:id', customOrderController.rejectedOrder)
router.post('/addcustomorderdetail/:id', customOrderController.addCustomOrderDetail)
router.post('/customordertocart/:id', customOrderController.addCustomOrderToCart)

router.post('/addNewOrder/:idcustomer', customOrderController.addNewOrder)
router.post('/addMaterialsCart/:idcustomer', customOrderController.addMaterialsToCart)
router.get('/cartMaterials/:idcustomer', customOrderController.getMaterialsCart)
router.get('/checkoutMaterials/:idcustomer', customOrderController.materialsCheckout)

router.get('/ShowCustomOrder/:id', customOrderController.showCustomOrder)
module.exports = router