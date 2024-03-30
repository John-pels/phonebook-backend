const User = require('../models/user')
const hashPassword = require('../utils/hashPassword')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      success: false,
      error: 'Invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })
  res.status(200).send({
    success: true,
    token,
    username: user.username,
    name: user.name,
  })
}

const getUsers = async (req, res) => {
  const users = await User.find({}).populate('persons', { name: 1, number: 1 })

  res.json({
    success: true,
    data: users,
  })
}

module.exports = { register, getUsers, login }
