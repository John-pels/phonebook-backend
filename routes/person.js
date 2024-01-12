const express = require('express')
const router = express.Router()
const personController = require('../controllers/person')

router.get('/info', (req, res) => {
  res.send('<h1>Phonebook Backend v1.0!</h1>')
})

//Get all the persons
router.get('/', personController.handleGetAllPersons)

//Get a person
router.get('/:id', personController.handleGetAPerson)

//Delete a person
router.delete('/:id', personController.handleDeleteAPerson)

//Update a person
router.put('/:id', personController.handleUpdateAPerson)

//Create a new person
router.post('/', personController.handleCreateAPerson)

module.exports = router
