const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'User full-name is required'],
    minLength: 5,
    unique: true,
  },
  number: {
    type: String,
    require: [true, 'User phone number is required'],
    minLength: 8,
    unique: true,
  },
})

BookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Book', BookSchema)
