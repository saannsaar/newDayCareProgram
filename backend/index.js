const { ApolloServer } = require('@apollo/server')
// const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
// const Book = require('./models/Book')
// const Author = require('./models/Author')
const User = require('./models/User')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
  console.log('error while connecting to MongoDB', error.message)
})




// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })



const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
 
  // Service listening to WebSockets (in addition to 
  // listening to HTTP rews on the server)which it binds to
  // the server's GraphQL schema
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
 // Subscription server doesn't take typeDefs and resolvers options, it takes an executable 
 // GraphQLSchema. Pass this schema object to APolloServer and subsc. server so its sure 
 // that the same schema is being used in both places
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

    // GraphQL-server inside the server variable is connected to listen 
    // to the root
  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      // Shutdown for the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      // Shutdown for the WebSocket server
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        };
      },
    },
  ],
  })
  // GraphQL server must start first so that Express app can start listening to the 
  // specified port, there is an async funcion 
  await server.start()
  app.use(
    '/',
    // Express server, cors and middlewares needed so that the data included
    // in the req is parsed correctly and CORS problems do not appear
    cors(),
    express.json(),
    expressMiddleware(server, {
      // Info about the logged-in user is set in the context 
      // using the function defined earlier
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      },
    }),
  )
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
start()