const Parent = require('./models/Parent')
const Child = require('./models/Child')
const DaycareWorker = require('./models/DaycareWorker')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const Group = require('./models/Group')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      childCount: async () => Child.collection.countDocuments(),

      allChildren: async (root, args) => {
        const result = await Child.find({}).populate('parents')
        return result
      },
      allParents: async (root, args) => {
        const result = await Parent.find({}).populate('children')
        return result
      },
      allWorkers: async (root, args) => {
        const result = await DaycareWorker.find({})
        return result
      },

    // Returns logged in user with the third parameter (context)
    // If the user is not logged in (no valid token in header) returns null
    me: (root, args, context) => {
      return context.currentUser
    }
       
    },
    Mutation: {
      addChild: async (root, args, context) => {
        console.log(root)
        console.log(args)
        // TODO
      },
    // TODO Myöhemmin: Yksi user jonka alla eri tyyppisiä usereita esim worker, parent jne
      createWorkerUser: async (root, args) => {
        const newuser = new DaycareWorker({ email: args.email })
  
        return newuser.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              conde: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
  
      login: async (root, args) => {
        const user = await DaycareWorker.findOne({ email: args.email })
  
        if ( !user || args.password !== 'secret' )
        {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const userForToken = {
          email: user.email,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    },
    DaycareWorker: {
      group: async (root) => {
        console.log(root)
        // First get the daycareworker
        const found_daycareworker = await DaycareWorker.findOne({ name: root.name })
        // Then get books that has has a reference to the found author (with id)
        const allChildren = await Group.find({ workers_in_charge: [workers_in_charge.find(n => n == found_daycareworker.name), ...workers_in_charge] })
        // return the length as in how many books one author has
        return allChildren
      }
    }
  }

  module.exports = resolvers