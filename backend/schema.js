
const typeDefs = `
type DaycareWorker {
  name: String!
  id: ID!
  born: String
  group: [String!]!
  phone: String!
  email: String!
}

type Parent {
    name: String!
    id: ID!
    born: String
    phone: String!
    email: String!
    children: [Child!]!
}

type Child {
  name: String!
  born: String!
  parent: [Parent!]!
  group: String!
}

type Token {
  value: String!
}

type Mutation {
  addChild(
    name: String!
    born: String!
    parent: [String!]!
    group: String!
  ): Child
}

  type Query {
    childCount: Int!
    allChildren: [Child!]
    allParents: [Parent!]
    allWorkers: [DaycareWorker!]
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs