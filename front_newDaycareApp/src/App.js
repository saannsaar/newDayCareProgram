/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect} from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeChildren } from './reducers/ChildReducer'
import {  initializeWorkers } from './reducers/WorkersReducer'
import  childService from './services/children'
import OwnGroup from './components/OwnGroup'
import {  removeCurrentUser } from './reducers/CurrentUser'
import Messages from './components/Messages'
import Daycare from './components/Daycare'
import Calendar from './components/Calendar'
import { initializeEvents } from './reducers/EventReducer'


const App = () => {

	const dispatch = useDispatch()

	const children = useSelector(state => state.children)
	const workers = useSelector(state => state.workers)
	const events = useSelector(state => state.events)
	console.log(events)
	const loggedInUser = useSelector(state => state.currentUser)
	console.log(children)
	console.log(workers)
	// const navigate = useNavigate()
	console.log(loggedInUser)
	

	useEffect(() => {
		dispatch(initializeChildren())
		dispatch(initializeWorkers())
		dispatch(initializeEvents())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			
			childService.setToken(user.token)
		}
	},[])


	const logout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogAppUser')
		dispatch(removeCurrentUser())
		console.log(loggedInUser)
	  }

	if (children.loading || workers.loading) {
		return (
			// eslint-disable-next-line react/react-in-jsx-scope
			<div> Loading...</div>)
	}

	if(!loggedInUser) {
		return (
			<BrowserRouter>
				
				<Routes>
					<Route path="/" element={<LoginForm />}/>
				</Routes>
			</BrowserRouter>
			
		)
	}
	if (loggedInUser) {
  
		return (
			<div>
				<BrowserRouter>
					<AppBar sx={{ bgcolor: 'primary.dark'}} position='static'>
						<Toolbar>
							<Button color="inherit" component={Link} to="/">Koti</Button>
							<Button color="inherit" component={Link} to="/daycare">Päiväkoti</Button>
							<Button color="inherit" component={Link} to="/messages">Viestit</Button>
							<Button color="inherit" component={Link} to="/calendar">Kalenteri</Button>
							<Button color="inherit" component={Link} to="/own-group">Oma ryhmä</Button>
							<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
						</Toolbar>
					</AppBar>
     
     
    

					<Routes>
						<Route path="/" element={<FrontPage events={events}/>}/>
						<Route path="/own-group" element={<OwnGroup worker={loggedInUser} workers={workers}/>}/>
						<Route path="/messages" element={<Messages/>}/>
						<Route path="/daycare" element={<Daycare/>}/>
						<Route path="/calendar" element={<Calendar/>}/>
					</Routes>
				</BrowserRouter>

      
      
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