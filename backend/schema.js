
const typeDefs = `
type DaycareWorker {
  name: String!
  id: ID!
  born: String!
  group: Group!
  phone: String!
  email: String!
}

type Group {
    name: String!
    id: String!
    workers_in_charge: [DaycareWorker!]!
    children: [Child!]!
  }

type Parent {
    name: String!
    id: ID!
    phone: String!
    email: String!
    children: [Child!]
}

type Child {
  name: String!
  born: String!
  parents: [Parent!]!
  group: Group
}

type Token {
  value: String!
}

type Mutation {
  addChild(
    name: String!
    born: String!
    parent: [String!]!
    group: String
  ): Child
  createWorkerUser(
    name: String!
    born: String!
    group:[String!]!
    phone: String!
    email: String!
  ): DaycareWorker
  addParent(
    name: String!
    phone: String!
    email: String!
  ): Parent
  login(email: String!, password: String!): Token
}

  type Query {
    childCount: Int!
    allChildren: [Child!]
    allParents: [Parent!]
    allWorkers: [DaycareWorker!]
    me: DaycareWorker
  }

`

module.exports = typeDefs