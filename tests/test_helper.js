const Book = require('../models/phonebook')
const User = require('../models/user')
const initialPersons = [
  {
    name: 'Irefin David',
    number: '+2340458034034',
  },
  {
    name: 'Taiwo M. Ajeigbe',
    number: '+2345039450430',
  },
]

const nonExistingId = async () => {
  const person = new Book({ name: 'willremovethissoon' })
  await person.save()
  await person.deleteOne()

  return person._id.toString()
}

const personsInDb = async () => {
  const persons = await Book.find({})
  return persons.map((person) => person.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialPersons,
  nonExistingId,
  personsInDb,
  usersInDb,
}
