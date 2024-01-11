require('dotenv').config()
const connectDb = require('./config/db')
connectDb()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const personRoutes = require('./routes/person')

app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.use('/api', personRoutes)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
