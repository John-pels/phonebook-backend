const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/create', userController.register)
router.post('/login', userController.login)
router.get('/', userController.getUsers)

module.exports = router
