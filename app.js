require('express-async-errors')
const connectDb = require('./config/db')
connectDb()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const middleware = require('./middleware')
const personRoutes = require('./routes/person')
const userRoutes = require('./routes/user')

app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.use('/api/persons', personRoutes)
app.use('/api/users', userRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
