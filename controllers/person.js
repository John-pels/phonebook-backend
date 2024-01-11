const Book = require('../models/phonebook')
const handleGetAllPersons = async (req, res, next) => {
  try {
    await Book.find({}).then((books) => {
      return res.json({ success: true, data: books })
    })
  } catch (err) {
    next(err)
  }
}

const handleGetAPerson = async (req, res, next) => {
  try {
    const id = req.params.id
    await Book.findById(id).then((book) => {
      if (!book)
        return res.status(404).json({ success: false, error: 'Not found' })
      return res.json({ success: true, data: book })
    })
  } catch (err) {
    next(err)
  }
}

const handleDeleteAPerson = async (req, res, next) => {
  try {
    const id = req.params.id
    await Book.findByIdAndDelete(id).then(() => {
      res.status(204).json({
        success: true,
        message: 'Entry was deleted successfully',
      })
    })
  } catch (err) {
    next(err)
  }
}

const handleUpdateAPerson = async (req, res, next) => {
  try {
    const body = req.body
    const id = req.params.id
    const person = {
      name: body.name,
      number: body.number,
    }

    await Book.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
      context: 'query',
    }).then((book) => {
      res.status(200).json({
        success: true,
        message: 'Entry was updated successfully',
        data: book,
      })
    })
  } catch (err) {
    next(err)
  }
}

const handleCreateAPerson = async (req, res, next) => {
  try {
    const { name, number } = req.body
    if (name === undefined || number === undefined) {
      res.status(400).json({
        error: 'Name and number are required',
      })
    }
    const person = new Book({
      name,
      number,
    })

    await person.save().then((savedPerson) => {
      return res.status(201).json({
        success: true,
        message: 'New entry added successfully',
        data: savedPerson,
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  handleGetAllPersons,
  handleGetAPerson,
  handleDeleteAPerson,
  handleUpdateAPerson,
  handleCreateAPerson,
}
