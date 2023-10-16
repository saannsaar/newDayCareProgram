/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { AppBar, Toolbar, Select, Button, MenuItem } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeChildren, removeChildren } from './reducers/ChildReducer'
import {  initializeWorkers } from './reducers/WorkersReducer'
import  childService from './services/children'
import parentService from './services/parents'
import eventService from './services/events'
import groupService from './services/groups'
import workerService from './services/workers'
import  careTimeService from './services/caretimes'
import OwnGroup from './components/workerPage/OwnGroup'
import {  removeCurrentUser } from './reducers/CurrentUser'
import Messages from './components/Messages'
import Daycare from './components/workerPage/Daycare'
import Calendar from './components/workerPage/Calendar'
import { initializeEvents, removeEvents } from './reducers/EventReducer'
import { initializeGroups, removeGroups } from './reducers/GroupReducer'
import { initializeDaycare, removeDaycare } from './reducers/DaycareReducer'
import ScheduleCare from './components/parentPage/ScheduleCare'
import MyFamily from './components/parentPage/MyFamily'
import { initializeCaretimes, removeCaretimes } from './reducers/CaretimeReducer'
import { removeType } from './reducers/UserType'
import { initializeCurrentChild, removeCurrentCHild } from './reducers/CurrentChild'


const App = () => {

	const dispatch = useDispatch()

	const kids = useSelector(state => state.children)
	const workers = useSelector(state => state.workers)
	const events = useSelector(state => state.events)
	const groups = useSelector(state => state.groups)
	const daycare = useSelector(state => state.daycare)
	const usertype = useSelector(state => state.usertype)
	const currentChild = useSelector(state => state.currentChild)

	const [pickedChild, setPickedChild] = useState('')
	const loggedInUser = useSelector(state => state.currentUser)
	
	const caretimes = useSelector(state => state.caretimes)
	console.log(kids)
	console.log(caretimes)
	console.log(currentChild)
	
	useEffect(() => {
		if (loggedInUser) {
			dispatch(initializeChildren(loggedInUser, usertype))
		}
	
		dispatch(initializeWorkers())
		dispatch(initializeEvents())
		dispatch(initializeGroups())
		
	}, [dispatch, loggedInUser])

	
	useEffect(() => {
		if (loggedInUser){
			dispatch(initializeCaretimes(loggedInUser, usertype, kids))
			console.log(kids)
			
		}
			
	}, [loggedInUser, kids.length])




	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			
			childService.setToken(user.token)
			careTimeService.setToken(user.token)
			parentService.setToken(user.token)
			eventService.setTokenForEvent(user.token)
			groupService.setToken(user.token)
			workerService.setToken(user.token)
		}
	},[])

	useEffect(() => {
		if (loggedInUser) {
			dispatch(initializeDaycare(loggedInUser))
		}
	}, [loggedInUser])

	const handlePickedChildChange = (event) => {
		console.log(event.target.value)
		setPickedChild(event.target.value)
		dispatch(removeCurrentCHild())
		dispatch(initializeCurrentChild(event.target.value))
	}
	const logout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedDaycareAppUser')
		dispatch(removeCurrentUser())
		dispatch(removeCaretimes())
		dispatch(removeDaycare())
		dispatch(removeType())
		dispatch(removeChildren())
		dispatch(removeGroups())
		dispatch(removeEvents())

	
		console.log(loggedInUser)
	  }


	if (loggedInUser && kids.length < 1){
		console.log('HALOOOO')
		return(
			<div>Wait..</div>
		)
		
	}
	

	if(!loggedInUser) {
		return (
			<BrowserRouter>
				
				<Routes>
					<Route path="/" element={<LoginForm  />}/>
				</Routes>
				<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
					<Toolbar>
						<div>
								@ NewDayCareApp 0.1
						</div>
					</Toolbar>
				</AppBar>
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

	if (loggedInUser && daycare && typeof kids === 'object'  && usertype === 'parent_user') {
		console.log(typeof kids)
		
		return (
			<div>
				<BrowserRouter>
					<AppBar sx={{ bgcolor: 'primary.dark'}} position='static'>
						<Toolbar><Select value={pickedChild}
							label="Käyttäjätyyppi"
							onChange={handlePickedChildChange}
						>
							<MenuItem disabled value="">
								<em>Valitse lapsi</em>
							</MenuItem>
							{Object.values(kids).map((k) => 
			
								<MenuItem key={k.name.concat('key')}value={k.id}> {k.name}</MenuItem>
							)}
						</Select>
						<Button color="inherit" component={Link} to="/">Koti</Button>
						<Button color="inherit" component={Link} to="/daycare">Ilmoitustaulu</Button>
						<Button color="inherit" component={Link} to="/messages">Viestit</Button>
						<Button color="inherit" component={Link} to="/calendar">Hoitoajat</Button>
						<Button color="inherit" component={Link} to="/own-group">Oma perhe</Button>
						<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
						</Toolbar>
					</AppBar>
     

					<Routes>
						<Route path="/" element={<FrontPage events={events} currentUser={loggedInUser} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-group" element={<MyFamily user={loggedInUser} kids={kids}/>}/>
						<Route path="/messages" element={<Messages/>}/>
						<Route path="/daycare" element={<Daycare workers={workers} groups={groups} kids={kids} daycare={daycare}/>}/>
						<Route path="/calendar" element={<ScheduleCare events={events} currentUser={loggedInUser} caretimes={caretimes} kids={kids}/>}/>
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