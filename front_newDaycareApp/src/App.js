/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect } from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeChildren, initializeParentsChildren } from './reducers/ChildReducer'
import {  initializeWorkers } from './reducers/WorkersReducer'
import  childService from './services/children'
import OwnGroup from './components/workerPage/OwnGroup'
import {  removeCurrentUser } from './reducers/CurrentUser'
import Messages from './components/Messages'
import Daycare from './components/workerPage/Daycare'
import Calendar from './components/workerPage/Calendar'
import { initializeEvents } from './reducers/EventReducer'
import { initializeGroups } from './reducers/GroupReducer'
import { initializeDaycare } from './reducers/DaycareReducer'
import ScheduleCare from './components/parentPage/ScheduleCare'
import Gallery from './components/parentPage/gallery'
import MyFamily from './components/parentPage/MyFamily'


const App = () => {

	const dispatch = useDispatch()

	const kids = useSelector(state => state.children)
	const workers = useSelector(state => state.workers)
	const events = useSelector(state => state.events)
	const groups = useSelector(state => state.groups)
	const daycare = useSelector(state => state.daycare)
	const usertype = useSelector(state => state.usertype)
	console.log(events)
	console.log(groups)
	console.log(daycare)
	const loggedInUser = useSelector(state => state.currentUser)
	console.log(kids)
	console.log(workers)
	// const navigate = useNavigate()
	console.log(loggedInUser)

	console.log(usertype)

	useEffect(() => {
		if(loggedInUser && usertype == 'worker_user') {
			dispatch(initializeChildren())
		}
		dispatch(initializeWorkers())
		dispatch(initializeEvents())
		dispatch(initializeGroups())
	}, [dispatch, usertype, loggedInUser])



	useEffect(() => {
		if(loggedInUser && usertype == 'parent_user') {
			dispatch(initializeParentsChildren(loggedInUser))
		}
	}, [dispatch, usertype, loggedInUser])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			
			childService.setToken(user.token)
		}
	},[])

	useEffect(() => {
		if (loggedInUser) {
			dispatch(initializeDaycare(loggedInUser))
		}
	}, [loggedInUser])

	const logout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedDaycareAppUser')
		dispatch(removeCurrentUser())
		console.log(loggedInUser)
	  }

	
	if(!loggedInUser) {
		return (
			<BrowserRouter>
				
				<Routes>
					<Route path="/" element={<LoginForm  />}/>
				</Routes>
			</BrowserRouter>
			
		)
	}
	if (loggedInUser && usertype === 'worker_user') {
		
		return (
			<div>
				<BrowserRouter>
					<AppBar sx={{ bgcolor: 'primary.dark'}} position='static'>
						<Toolbar>
							<Button color="inherit" component={Link} to="/">Koti</Button>
							<Button color="inherit" component={Link} to="/daycare">Päiväkoti</Button>
							<Button color="inherit" component={Link} to="/messages">Viestit</Button>
							<Button color="inherit" component={Link} to="/calendar">Kalenteri</Button>
							<Button color="inherit" component={Link} to="/own-group">Omat tiedot</Button>
							<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
						</Toolbar>
					</AppBar>
     
     
    

					<Routes>
						<Route path="/" element={<FrontPage events={events} currentUser={loggedInUser} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-group" element={<OwnGroup worker={loggedInUser} workers={workers}/>}/>
						<Route path="/messages" element={<Messages/>}/>
						<Route path="/daycare" element={<Daycare workers={workers} groups={groups} kids={kids} daycare={daycare}/>}/>
						<Route path="/calendar" element={<Calendar events={events}/>}/>
					</Routes>

					<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
						<Toolbar>
							<div>
								@ NewDayCareApp 0.1
							</div>
						</Toolbar>
					</AppBar>
				</BrowserRouter>

      
      
			</div>
		)
	} 

	if (loggedInUser && daycare && usertype === 'parent_user') {
		return (
			<div>
				<BrowserRouter>
					<AppBar sx={{ bgcolor: 'primary.dark'}} position='static'>
						<Toolbar>
							<Button color="inherit" component={Link} to="/">Koti</Button>
							<Button color="inherit" component={Link} to="/daycare">Ilmoitustaulu</Button>
							<Button color="inherit" component={Link} to="/messages">Viestit</Button>
							<Button color="inherit" component={Link} to="/calendar">Hoitoajat</Button>
							<Button color="inherit" component={Link} to="/gallery">Kuvat</Button>
							<Button color="inherit" component={Link} to="/own-group">Oma perhe</Button>
							<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
						</Toolbar>
					</AppBar>
     

					<Routes>
						<Route path="/" element={<FrontPage events={events} currentUser={loggedInUser} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-group" element={<MyFamily user={loggedInUser} kids={kids}/>}/>
						<Route path="/messages" element={<Messages/>}/>
						<Route path="/daycare" element={<Daycare workers={workers} groups={groups} kids={kids} daycare={daycare}/>}/>
						<Route path="/calendar" element={<ScheduleCare events={events}/>}/>
						<Route path="/gallery" element={<Gallery />}/>
					</Routes>

					<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
						<Toolbar>
							<div>
								@ NewDayCareApp 0.1
							</div>
						</Toolbar>
					</AppBar>
				</BrowserRouter>
			</div>
		)
	}



	else return (
		<div>
    Loading...
		</div>
	)
 
}

export default App