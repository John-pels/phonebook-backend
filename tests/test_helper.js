const Book = require('../models/phonebook')

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

module.exports = {
  initialPersons,
  nonExistingId,
  personsInDb,
}
