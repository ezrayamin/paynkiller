const router = require('express').Router()
const {uomController} = require('../controllers')

router.get('/displayuom',uomController.getUoms)
router.get('/searchuom/:id',uomController.searchUom)
router.post('/adduom',uomController.addUom)
router.post('/edituom/:id',uomController.editUom)
router.post('/deleteuom/:id',uomController.deleteUom)

module.exports = router