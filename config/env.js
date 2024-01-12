require('dotenv').config()

const PORT = process.env.PORT
const DB_URI =
  process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL

module.exports = { DB_URI, PORT }
