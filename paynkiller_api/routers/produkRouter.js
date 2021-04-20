const router = require('express').Router()
const {produkController} = require('../controllers')

router.post('/getProduk', produkController.produk)

module.exports = router