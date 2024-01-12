const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../config/env')
mongoose.set('strictQuery', false)
logger.info('====> Establishing connection to database...')

const connectDb = async () => {
  try {
    await mongoose.connect(config.DB_URI)
    logger.info('=====> Successfully connected to database!')
  } catch (error) {
    logger.error('====> Error connecting to MongoDB:', error.message)
  }
}

module.exports = connectDb
