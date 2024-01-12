const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Book = require('../models/phonebook')

beforeEach(async () => {
  await Book.deleteMany({})
  let personObject = new Book(helper.initialPersons[0])
  await personObject.save()
  personObject = new Book(helper.initialPersons[1])
  await personObject.save()
}, 100000)

//for getting all persons
test('phonebooks are returned as json', async () => {
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

  const names = response.body.data.map((r) => r.name)
  expect(names).toContain('Taiwo M. Ajeigbe')
})

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

test('person without name is not added', async () => {
  const newPerson = {
    number: '+23405803403',
  }
  await api.post('/api/persons').send(newPerson).expect(400)

  const personsAtEnd = await helper.personsInDb()
  expect(personsAtEnd).toHaveLength(helper.initialPersons.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
