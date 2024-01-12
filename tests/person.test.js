const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Book = require('../models/phonebook')

beforeEach(async () => {
  await Book.deleteMany({})
  await Book.insertMany(helper.initialPersons)
}, 100000)
describe('when there are initally persons saved', () => {
  //for getting all persons
  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')

    expect(response.body.data).toHaveLength(helper.initialPersons.length)
  })

  test('a specific person is within the returned persons', async () => {
    const response = await api.get('/api/persons')

    const names = response.body.data.map((p) => p.name)
    expect(names).toContain('Taiwo M. Ajeigbe')
  })
})

describe('viewing specifi person', () => {
  //A specific person can be viewed
  test('a specific person can be viewed', async () => {
    const personsAtStart = await helper.personsInDb()

    const personToView = personsAtStart[0]

    const resultNote = await api
      .get(`/api/persons/${personToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body.data).toEqual(personToView)
  })

  test('fails with statuscode 404 if person does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/persons/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/persons/${invalidId}`).expect(400)
  })
})

describe('addition of a new person', () => {
  //for creating a new person
  test('a valid person can be added', async () => {
    const newPerson = {
      name: 'Kehinde T. Ajeigbe',
      number: '+234495903945',
    }
    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const personAtEnd = await helper.personsInDb()
    expect(personAtEnd).toHaveLength(helper.initialPersons.length + 1)
    const names = personAtEnd.map((p) => p.name)
    expect(names).toContain('Kehinde T. Ajeigbe')
  })

  test('fails with status code 400 if data invalid', async () => {
    const newPerson = {
      number: '+2349584985094',
    }

    await api.post('/api/persons').send(newPerson).expect(400)
    const personsAtEnd = await helper.personsInDb()
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length)
  })
})

describe('deletion of a person', () => {
  //a person can be deleted
  test('a person can be deleted', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToDelete = personsAtStart[0]
    await api.delete(`/api/persons/${personToDelete.id}`).expect(204)
    const personsAtEnd = await helper.personsInDb()
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length - 1)
    const names = personsAtEnd.map((p) => p.name)
    expect(names).not.toContain(personToDelete.name)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
