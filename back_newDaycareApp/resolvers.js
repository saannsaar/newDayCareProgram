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
        const result = await Child.find({}).populate('parents').populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
        return result
      },
      allParents: async (root, args) => {
        const result = await Parent.find({}).populate({path: 'children', model: 'Child', populate :{path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}}})
        return result
      },
      allWorkers: async (root, args) => {
        const result = await DaycareWorker.find({}).populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
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

        const currentUser = context.currentUser
        console.log(currentUser)

        if (!currentUser) {
            throw new GraphQLError('not authenticated to add a new child', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            })
        }

        const parent_is_found = await Parent.find({ name: args.parent[0] || args.parent[1] })
        console.log(parent_is_found)

        // If parent is not found, have to add new parent to the db
        if(!parent_is_found) {
            throw new GraphQLError('No parent found and cant add child', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.parent.name,
                    error
                }
            })
        }
        if (parent_is_found.length == 1) {
            const newChild = await new Child({ ...args, parents: [ parent_is_found[0] ]})
            try {
                await newChild.save()
                pubsub.publish('CHILD_ADDED', { addChild: newChild})
            } catch(error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            return newChild
        }

        if(parent_is_found.length == 2) {
            const newChild = await new Child({...args, parents: [ parent_is_found[0], parent_is_found[1] ]})
            try {
                await newChild.save()
                pubsub.publish('CHILD_ADDED', { addChild: newChild})
            } catch(error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            return newChild
        }
        
      },
      addParent: async (root, args, context) => {
        console.log(root)
        console.log(args)

        const currentUser = context.currentUser
        console.log(currentUser)

        if (!currentUser) {
            throw new GraphQLError('not authenticated to add a new child', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            })
        }
        const newParent = await new Parent({...args})
        try {
            await newParent.save()
            pubsub.publish('PARENT_ADDED', { addParent: newParent})
        } catch(error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            })
        }
        return newParent
      },
    // TODO Myöhemmin: Yksi user jonka alla eri tyyppisiä usereita esim worker, parent jne
      createWorkerUser: async (root, args) => {
        const newuser = new DaycareWorker({ email: args.email })
  
        return newuser.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
      editGroup: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
            throw new GraphQLError('not authenticated to make changes', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                }
            })
        }

        const findGroup = await Group.findOne({ name: args.name })
        // If there is no group found from the db 
        // With given name, return null
        if (!findGroup) {
            return null
        }
        // Find the child from the db
        const findChild = await Child.findOne({ name: args.child })

        // Add child to the groups "children" array
        findGroup.children = [...findGroup.children, findChild]
        // Save changes
        return await findGroup.save()

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
    }
  }

  module.exports = resolvers