/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { useQuery, useApolloClient } from '@apollo/client'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ALL_CHILDREN, ALL_PARENTS, ALL_WORKERS } from './queries'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'


const App = () => {

	
	const [token, setToken] = useState(null)
	const children = useQuery(ALL_CHILDREN)
	const parents = useQuery(ALL_PARENTS)
	const workers = useQuery(ALL_WORKERS)
	const client = useApolloClient()


	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if (children.loading || parents.loading || workers.loading) {
		return (
			// eslint-disable-next-line react/react-in-jsx-scope
			<div> Loading...</div>)
	}

	if(!token) {
		return (
			<div>
				<LoginForm setToken={setToken}/>
			</div>
		)
	}
	if (token) {
  
		return (
			<div>
				<Router>

					<AppBar position='static'>
						<Toolbar>
							<Button color="inherit" component={Link} to="/">Home</Button>
							<Button color="inherit" component={Link} to="/daycare">Home</Button>
							<Button color="inherit" component={Link} to="/families">Home</Button>
							<Button color="inherit" component={Link} to="/calendar">Home</Button>
							<Button color="inherit" component="button" onClick={logout}>Logout</Button>
						</Toolbar>
					</AppBar>
     
     
    

					<Routes>
						<Route path="/" element={<FrontPage />}/>
					</Routes>
				</Router>

      
      
			</div>
		)
	}



	else return (
		<div>
    Moi
		</div>
	)
 
}

export default App