const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  const SALT_ROUNDS = 10
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}
module.exports = hashPassword
