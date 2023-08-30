/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect} from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeChildren } from './reducers/ChildReducer'
import {  initializeWorkers } from './reducers/WorkersReducer'
import  childService from './services/children'

const App = () => {

	const dispatch = useDispatch()

	const children = useSelector(state => state.children)
	const workers = useSelector(state => state.workers)
	console.log(children)
	console.log(workers)
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		dispatch(initializeChildren())
		dispatch(initializeWorkers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setCurrentUser(user)
			childService.setToken(user.token)
		}
	},[])


	const logout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogAppUser')
		setCurrentUser(null)
	
	  }

	if (children.loading || workers.loading) {
		return (
			// eslint-disable-next-line react/react-in-jsx-scope
			<div> Loading...</div>)
	}

	if(!currentUser) {
		return (
			<div>
				<LoginForm setCurrentUser={setCurrentUser}/>
			</div>
		)
	}
	if (currentUser) {
  
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