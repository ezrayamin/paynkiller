const router = require('express').Router()
const {stokProdukController} = require('../controllers')

router.get('/stokproducts',stokProdukController.getStokProduk)
router.post('/addstokproduct',stokProdukController.addStokProduk)
router.post('/editstokproduk/:id',stokProdukController.editStokProduk)
router.post('/deletestokproduk/:id',stokProdukController.deleteStokProduk)
router.post('/searchprodukfilter',stokProdukController.searchProdukFilter)
router.patch('/decreaseProductStock', stokProdukController.decreaseStock)

module.exports = router