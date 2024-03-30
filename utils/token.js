const jwt = require('jsonwebtoken')
const getTokenFromBrowser = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const decodeToken = (request) => {
  const decodedToken = jwt.verify(
    getTokenFromBrowser(request),
    process.env.SECRET,
  )
  if (decodedToken.id) return decodedToken
  return null
}

module.exports = { getTokenFromBrowser, decodeToken }
