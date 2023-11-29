const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

const childRouter = require('./controllers/children')
const workerRouter = require('./controllers/workers')
const parentRouter = require('./controllers/parents')
const loginRouter = require('./controllers/login')
const groupRouter = require('./controllers/groups')
const eventsRouter = require('./controllers/events')
const daycareRouter = require('./controllers/daycare')
const messageRouter = require('./controllers/message')
const notificationRouter = require('./controllers/notificationsController')

//

if (process.env.NODE_ENV === 'test') {
  console.log("TESTI")
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
const middleware = require('./utils/middleware')
mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())
  app.use(middleware.requestLogger)
 

  app.use('/api/children', middleware.userExtractor, childRouter)
  app.use('/api/workers', middleware.userExtractor, workerRouter)
  app.use('/api/parents', middleware.userExtractor, parentRouter)
  app.use ('/api/groups',middleware.userExtractor,  groupRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/events', middleware.userExtractor, eventsRouter)
  app.use('/api/daycare', daycareRouter)
  app.use('/api/notifications', middleware.userExtractor, notificationRouter)
  app.use('/api/messages', middleware.userExtractor, messageRouter)
 
  
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)


  module.exports = app