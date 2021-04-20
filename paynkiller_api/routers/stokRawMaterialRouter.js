const router = require('express').Router()
const {stokRawMaterialController} = require('../controllers')

router.get('/stokrawmaterials',stokRawMaterialController.getStokRawMaterial)
router.post('/addstokrawmaterial',stokRawMaterialController.addStokRawMaterial)
router.post('/editstokrawmaterial/:id',stokRawMaterialController.editStokRawMaterial)
router.post('/deletestokrawmaterial/:id',stokRawMaterialController.deleteStokRawMaterial)
router.get('/selectpickerrawmaterial',stokRawMaterialController.selectPickerRawMaterial)
router.patch('/decreaseMaterialsStock', stokRawMaterialController.decreaseStockMaterial)

module.exports = router