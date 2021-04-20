const userController = require('./userController')
const orderController = require('./orderController')
const reportController = require('./reportController')
const categoryController = require('./categoryController')
const produkController = require('./produkController')
const brandController = require('./brandController')
const uomController = require('./uomController')
const adminController = require('./adminController')
const productController = require('./productController')
const rawMaterialController = require('./rawMaterialController')
const stokProdukController = require('./stokProdukController')
const stokRawMaterialController = require('./stokRawMaterialController')
const customOrderController = require('./customOrderController')
const userHistoryController = require('./userHistoryController')

module.exports = {
    userController,
    categoryController,
    reportController,
    produkController,
    orderController,
    brandController,
    uomController,
    adminController,
    productController,
    rawMaterialController,
    stokProdukController,
    stokRawMaterialController,
    customOrderController,
    userHistoryController
}