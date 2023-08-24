
const typeDefs = `
type DaycareWorker {
  name: String!
  id: ID!
  born: String!
  group:[Group!]
  phone: String!
  email: String!
}

type Group {
    name: String!
    id: String!
    workers_in_charge: [String!]!
    children: [Child!]!
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
  groupId: String!
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