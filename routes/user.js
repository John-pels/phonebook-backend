const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/', userController.register)
router.get('/', userController.getUsers)

module.exports = router
