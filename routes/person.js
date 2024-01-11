const express = require('express')
const router = express.Router()
const personController = require('../controllers/person')

router.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend v1.0!</h1>')
})

//Get all the persons
router.get('/persons', personController.handleGetAllPersons)

//Get a person
router.get('/persons/:id', personController.handleGetAPerson)

//Delete a person
router.delete('/persons/:id', personController.handleDeleteAPerson)

//Update a person
router.put('/persons/:id', personController.handleUpdateAPerson)

//Create a new person
router.post('/persons', personController.handleCreateAPerson)

module.exports = router
