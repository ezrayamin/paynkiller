const router = require('express').Router()
const {brandController} = require('../controllers')

router.get('/brands',brandController.getBrands)
router.get('/getbrand/:id',brandController.searchBrand)
router.post('/addbrand',brandController.addBrand)
router.post('/editbrand/:id',brandController.editBrand)
router.post('/deletebrand/:id',brandController.deleteBrand)

module.exports = router