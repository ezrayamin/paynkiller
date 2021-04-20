const router = require('express').Router()
const {productController} = require('../controllers')

const {upload} = require('../helpers/multer')
const uploader = upload()

router.get('/displayproduk', productController.getProducts)
router.post('/addproduk', productController.addProduct)
router.post('/uploadgambar/:id', uploader, productController.uploadGambarProduct)
router.get('/getmaxid', productController.getMaxId)
router.post('/editproduct/:id', productController.editProduct)
router.post('/deleteproduct/:id', productController.deleteProduct)
router.get('/getproduct/:id', productController.searchProduct)

module.exports = router