import { gql } from '@apollo/client'

export const ALL_CHILDREN = gql`
query {
    allChildren {
        name
        born
        parents {
            name
        }
        group {
            name
        }
    }
}`


export const ALL_PARENTS = gql`
query {
    allParents {
        name
        children {
            name
        }
        email
        phone
    }
}`


export const ALL_WORKERS = gql`
query {
    allWorkers {
        name
        born
        group {
            name
        }
        phone
        email
    }
}`

export const ME_USER = gql`
query {
    me {
        name
        email
    }
}`

export const ADD_CHILD = gql`
mutation NewChild($name: String!, $born: String!, $parent: [String!]!, $group: String) {
    addChild(name: $name, born: $born, parent: $parent, group: $group) {
        name,
        born,
        parent { name },
        group
    }
}`

export const LOG_IN = gql`
mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        value
    }
}`