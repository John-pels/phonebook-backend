const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ajeigbejohnolu:${password}@cluster0.ag1lwiz.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const BookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Book = mongoose.model('Book', BookSchema)

const book = new Book({
  name: 'Mary Poppendieck',
  number: '39-23-6423122',
})

book.save().then((result) => {
  console.log(Book)
  console.log('note saved!')
  mongoose.connection.close()
})
