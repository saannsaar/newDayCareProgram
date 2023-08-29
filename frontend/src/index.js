import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, gql, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities/graphql/getFromAST'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { Container } from '@mui/material'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('library-user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}`: null,
		}
	}
})

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(createClient({
	url: 'ws://localhost:4000'
}))

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query)
		return (
			definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
		)
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink
})

const query = gql`
query {
    allChildren {
        name
        born
        parents { name }
        group
      }
      allParents {
        name
        phone
        email 
        children { name }
      }
      allWorkers {
        name
        born
        group { name }
        phone 
        email
      }
}
`
// Client-olio lähettää kyselyn palvelimelle
client.query({ query }).then((response) => {
	console.log(response.data)
})


ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<Container>
			<App />
		</Container>

	</ApolloProvider>)