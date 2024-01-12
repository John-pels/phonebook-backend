const Book = require('../models/phonebook')
const handleGetAllPersons = async (req, res, next) => {
  try {
    const allPersons = await Book.find({})
    return res.json({ success: true, data: allPersons })
  } catch (err) {
    next(err)
  }
}

const handleGetAPerson = async (req, res, next) => {
  try {
    const id = req.params.id
    const person = await Book.findById(id)
    if (!person)
      return res.status(404).json({ success: false, error: 'Not found' })
    return res.json({ success: true, data: person })
  } catch (err) {
    next(err)
  }
}

const handleDeleteAPerson = async (req, res, next) => {
  try {
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    return res.status(204).json({
      success: true,
      message: 'Entry was deleted successfully',
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
  } catch (err) {
    next(err)
  }
}

const handleCreateAPerson = async (req, res, next) => {
  try {
    const { name, number } = req.body
    if (name === undefined || number === undefined) {
      return res.status(400).json({
        error: 'Name and number are required',
      })
    }

    const person = new Book({
      name,
      number,
    })

    const savedPerson = await person.save()
    res.status(201).json({
      success: true,
      message: 'New entry added successfully',
      data: savedPerson,
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
