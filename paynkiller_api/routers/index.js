const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const categoryRouter = require('./categoryRouter')
const reportRouter = require('./reportRouter')
const produkRouter = require('./produkRouter')
const brandRouter = require('./brandRouter')
const uomRouter = require('./uomRouter')
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')
const rawMaterialRouter = require('./rawMaterialRouter')
const stokProdukRouter = require('./stokProdukRouter')
const stokRawMaterialRouter = require('./stokRawMaterialRouter')
const customOrderRouter = require('./customOrderRouter')
const userHistoryRouter = require('./userHistoryRouter')

module.exports = {
    userRouter,
    categoryRouter,
    reportRouter,
    brandRouter,
    uomRouter,
    adminRouter,
    productRouter,
    rawMaterialRouter,
    stokProdukRouter,
    stokRawMaterialRouter,
    orderRouter,
    produkRouter,
    customOrderRouter,
    userHistoryRouter
}