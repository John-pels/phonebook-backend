const mongoose = require('mongoose')
mongoose.set('strict', false)
const url = process.env.DB_URL
console.log('====> Establishing connection to database...')

const connectDb = async () => {
  try {
    await mongoose.connect(url)
    console.log('=====> Successfully connected to database!')
  } catch (error) {
    console.log('====> Error connecting to MongoDB:', error.message)
  }
}

module.exports = connectDb
