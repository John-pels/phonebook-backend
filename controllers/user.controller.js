const User = require('../models/user')
const hashPassword = require('../utils/hashPassword')

const register = async (req, res) => {
  const { username, name, password } = req.body
  const hashedPassword = await hashPassword(password)

  const user = new User({
    username,
    name,
    hashedPassword,
  })

  const savedUser = await user.save()
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: savedUser,
  })
}

const getUsers = async (req, res) => {
  const users = await User.find({}).populate('persons', { name: 1, number: 1 })

  res.json({
    success: true,
    data: users,
  })
}

module.exports = { register, getUsers }
