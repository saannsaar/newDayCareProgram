const logger = require('./logger.js')
const DaycareWorker = require('../models/DaycareWorker')
const Parent = require('../models/Parent')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method: '.concat(request.method).concat(' Path:  ').concat(request.path).concat(' Body:  ').concat(JSON.stringify(request.body)))
    next()
  }

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint!' })
}

const errorHandler = (error, request, response, next) => {
logger.error(error.message)

if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
} else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
} else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({error: "token missing or invalid"})
} else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
        error: "token expired"
    })
}

next(error)
}

const getTokenFrom = request => {
    const authorization = request.get("Authorization")
    if (authorization && authorization.startsWith("bearer ")) {
        return authorization.replace("bearer ", "")
    } else {
        return null
    }
    
}

const tokenExtractor = ( request, response, next ) => {
    request.token = getTokenFrom(request)
    next()
}

const userExtractor = async ( request, response, next ) => {
    const token = getTokenFrom(request)
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token is invalid"})
        }
        const find = await DaycareWorker.findById(decodedToken.id)
        if (find) {
            console.log('Found')
            request.user = find
        } else {
            console.log("PARENT userextractor")
            request.user = await Parent.findById(decodedToken.id)
        }
        
    }

    next()
}

module.exports = {
requestLogger,
unknownEndpoint,
errorHandler,
userExtractor,
tokenExtractor,
}