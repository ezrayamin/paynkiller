const router = require('express').Router()
const {rawMaterialController} = require('../controllers')

router.get('/displayrawmaterial',rawMaterialController.getRawMaterial)
router.post('/addrawmaterial',rawMaterialController.addRawMaterial)
router.post('/editrawmaterial/:id',rawMaterialController.editRawMaterial)
router.post('/deleterawmaterial/:id',rawMaterialController.deleteRawMaterial)
router.get('/getrawmaterial/:id', rawMaterialController.searchRawMaterial)


module.exports = router