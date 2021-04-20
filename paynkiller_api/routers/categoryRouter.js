const router = require('express').Router()
const {categoryController} = require('../controllers')

router.get('/getAll', categoryController.getAllCate)
router.post('/add', categoryController.add)
router.delete('/delete/:id', categoryController.delete)
router.patch('/edit/:id', categoryController.editCate)
router.get('/getTopNode', categoryController.topNode)

module.exports = router