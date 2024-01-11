const envConfig = require('./config/env')
const app = require('./app')
const logger = require('./utils/logger')

app.listen(envConfig.PORT, () => {
  logger.info(`Server running on port ${envConfig.PORT}`)
})
