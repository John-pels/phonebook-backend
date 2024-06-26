const Book = require('../models/phonebook')
const User = require('../models/user')
const { decodeToken } = require('../utils/token')

const handleGetAllPersons = async (req, res) => {
  const allPersons = await Book.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  return res.json({ success: true, data: allPersons })
}

const handleGetAPerson = async (req, res) => {
  const id = req.params.id
  const person = await Book.findById(id)
  if (!person)
    return res.status(404).json({ success: false, error: 'Not found' })
  return res.json({ success: true, data: person })
}

const handleDeleteAPerson = async (req, res) => {
  const id = req.params.id
  await Book.findByIdAndDelete(id)
  return res.status(204).json({
    success: true,
    message: 'Entry was deleted successfully',
  })
}

const handleUpdateAPerson = async (req, res) => {
  const body = req.body
  const id = req.params.id
  const person = {
    name: body.name,
    number: body.number,
  }

  const updatedPerson = await Book.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  return res.status(200).json({
    success: true,
    message: 'Entry was updated successfully',
    data: updatedPerson,
  })
}

const handleCreateAPerson = async (req, res) => {
  const { name, number } = req.body
  const decodedToken = decodeToken(req)
  if (!decodedToken.id) {
    return res.status(403).json({ success: false, error: 'Invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  if (name === undefined || number === undefined) {
    return res.status(400).json({
      error: 'Name and number are required',
    })
  }
  const person = new Book({
    name,
    number,
    user: user.id,
  })

  const savedPerson = await person.save()
  user.persons = user.persons.concat(savedPerson._id)
  await user.save()
  return res.status(201).json({
    success: true,
    message: 'New entry added successfully',
    data: savedPerson,
  })
}

module.exports = {
  handleGetAllPersons,
  handleGetAPerson,
  handleDeleteAPerson,
  handleUpdateAPerson,
  handleCreateAPerson,
}
