/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
// import  childService from './services/children'
// import parentService from './services/parents'
// import eventService from './services/events'
// import groupService from './services/groups'
// import workerService from './services/workers'
// import notiservice from './services/notiservice'
import OwnGroup from './components/workerPage/OwnGroup'
import {  removeCurrentUser } from './reducers/CurrentUser'
import axios from 'axios'
import Messages from './components/Messages'
import Daycare from './components/workerPage/Daycare'

import { initializeEvents, removeEvents } from './reducers/EventReducer'
import { initializeGroups, removeGroups } from './reducers/GroupReducer'
import { initializeDaycare, removeDaycare } from './reducers/DaycareReducer'
import ScheduleCare from './components/parentPage/ScheduleCare'
import MyFamily from './components/parentPage/MyFamily'
import { initializeCaretimes, removeCaretimes } from './reducers/CaretimeReducer'
import { removeType } from './reducers/UserType'
import { initializeCurrentChild, removeCurrentCHild } from './reducers/CurrentChild'
import { emptyNotifications, initializeNotifications } from './reducers/NotificationReducer'


const App = () => {

	const dispatch = useDispatch()
	const [weather, setWeather] = useState(null)
	const api_key = process.env.REACT_APP_WEATHER_API_KEY


	const lat = '62.24147'
	const lon = '25.72088'

	const kids = useSelector(state => state.children)
	const workers = useSelector(state => state.workers)
	const events = useSelector(state => state.events)
	const groups = useSelector(state => state.groups)
	const daycare = useSelector(state => state.daycare)
	const usertype = useSelector(state => state.usertype)
	const currentChild = useSelector(state => state.currentChild)
	const allNotifications = useSelector(state => state.notifications)

	const [pickedChild, setPickedChild] = useState('')
	const loggedInUser = useSelector(state => state.currentUser)
	
	const caretimes = useSelector(state => state.caretimes)

	
	useEffect(() => {
		if (loggedInUser) {
			dispatch(initializeChildren(loggedInUser, usertype))
			dispatch(initializeWorkers())
			dispatch(initializeEvents())
			dispatch(initializeGroups())
			dispatch(initializeNotifications())
			dispatch(initializeDaycare(loggedInUser))
			
		}
		
		if (loggedInUser && usertype == 'parent_user') {
			setPickedChild(loggedInUser.children[0].id)
			dispatch(initializeCurrentChild(loggedInUser.children[0]))
		}
		
		
		
	}, [loggedInUser, kids.length])

	useEffect(() => {
		console.log(kids.length, currentChild)
		console.log(kids)
		if (loggedInUser && kids.length != 0 && currentChild != '') {
			dispatch(initializeCaretimes(loggedInUser, usertype, kids, currentChild))
		}
	}, [loggedInUser, currentChild])

	useEffect(() => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
			.then((response) => {
				console.log('weather', response.data)
				setWeather(response.data)
			})
	},[])

	// useEffect(() => {
	// 	const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
	// 	if (loggedUserJSON) {
	// 		const user = JSON.parse(loggedUserJSON)
	// 		childService.setToken(user.token)
	// 		parentService.setToken(user.token)
	// 		eventService.setTokenForEvent(user.token)
	// 		groupService.setToken(user.token)
	// 		workerService.setToken(user.token)
	// 		notiservice.setToken(user.token)
	// 	}

	// },[])


	const handlePickedChildChange = (event) => {
		console.log(event.target.value)
		setPickedChild(event.target.value)
		const findChild = loggedInUser.children.find((d) => d.id == event.target.value)
		console.log(findChild)
		dispatch(removeCurrentCHild())
		dispatch(removeCaretimes())
		dispatch(initializeCurrentChild(findChild))
		dispatch(initializeCaretimes(loggedInUser, usertype, kids, currentChild))
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
		dispatch(emptyNotifications())

	
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
							<Button color="inherit" component={Link} to="/own-group">Omat tiedot</Button>
							<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
							
						</Toolbar>
					</AppBar>
     
     
    

					<Routes>
						<Route path="/" element={<FrontPage weather={weather} notifications={allNotifications} events={events} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-group" element={<OwnGroup worker={loggedInUser} workers={workers}/>}/>
						<Route path="/messages" element={<Messages/>}/>
						<Route path="/daycare" element={<Daycare caretimes={caretimes} workers={workers} groups={groups} kids={kids} daycare={daycare}/>}/>
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

	if (loggedInUser && daycare && typeof kids === 'object' && currentChild && usertype === 'parent_user') {
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
						<Button color="inherit" component={Link} to="/messages">Viestit</Button>
						<Button color="inherit" component={Link} to="/caretimes">Hoitoajat</Button>
						<Button color="inherit" component={Link} to="/own-family">Oma perhe</Button>
						<Button color="inherit" component="button" onClick={logout}>Kirjaudu ulos</Button>
						</Toolbar>
					</AppBar>
     

					<Routes>
						<Route path="/" element={<FrontPage weather={weather} notifications={allNotifications} events={events}  kids={currentChild} usertype={usertype}/>}/>
						<Route path="/own-family" element={<MyFamily user={loggedInUser} kids={kids}/>}/>
						<Route path="/messages" element={<Messages usertype={usertype} currentUser={loggedInUser}/>}/>
						<Route path="/caretimes" element={<ScheduleCare events={events} currentUser={loggedInUser} caretimes={caretimes} pickedChildId={currentChild.id} pickedChild={currentChild}/>}/>
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