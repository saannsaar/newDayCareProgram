/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { AppBar, Toolbar, Select, Button, MenuItem } from '@mui/material'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
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
import { initializeConversation } from './reducers/ConversationsReducer'


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
	console.log(caretimes)
	
	useEffect(() => {
		if (loggedInUser) {
			dispatch(initializeChildren(loggedInUser, usertype))
			dispatch(initializeWorkers())
			dispatch(initializeEvents())
			dispatch(initializeGroups())
			dispatch(initializeNotifications())
			dispatch(initializeDaycare(loggedInUser))
			dispatch(initializeConversation(usertype))
			
			
		}
		
		if (loggedInUser && usertype == 'parent_user') {
			setPickedChild(loggedInUser.children[0].id)
			dispatch(initializeCurrentChild(loggedInUser.children[0]))
		}
		
		
		
	}, [loggedInUser, kids.length])

	useEffect(() => {
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

	const handlePickedChildChange = (event) => {
		setPickedChild(event.target.value)
		const findChild = loggedInUser.children.find((d) => d.id == event.target.value)
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
	
	return(
		<div>
			{!loggedInUser && 
			<LoginForm  />
			}

			{loggedInUser &&
				<BrowserRouter>
					<AppBar sx={{ bgcolor: 'primary.dark'}} position='static'>
						<Toolbar>
							{usertype == 'parent_user' && <Select value={pickedChild}
								label="Käyttäjätyyppi"
								onChange={handlePickedChildChange}
							>
								<MenuItem disabled value="">
									<em>Valitse lapsi</em>
								</MenuItem>
								{Object.values(kids).map((k) => 
			
									<MenuItem key={k.name.concat('key')}value={k.id}> {k.name}</MenuItem>
								)}
							</Select>}
							<Button color="inherit" component={Link} to="/">Koti</Button>

							{usertype == 'worker_user' &&
							<Button color="inherit" component={Link} to="/daycare">Päiväkoti</Button>}
							
							<Button color="inherit" component={Link} to="/messages">Viestit</Button>

							{usertype== 'worker_user' &&
							<Button color="inherit" component={Link} to="/own-group">Omat tiedot</Button>
							}
							{usertype == 'parent_user' &&
													<><Button color="inherit" component={Link} to="/caretimes">Hoitoajat</Button><Button color="inherit" component={Link} to="/own-family">Oma perhe</Button></>}
							
							<Button color="inherit"  onClick={logout}>Kirjaudu ulos</Button>
						
						</Toolbar>
					</AppBar>
 
 


					<Routes>
						<Route path="/" element={<FrontPage weather={weather} notifications={allNotifications} events={events} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-group" element={<OwnGroup worker={loggedInUser} workers={workers}/>}/>
						<Route path="/own-family" element={<MyFamily user={loggedInUser} kids={kids}/>}/>
						<Route path="/caretimes" element={<ScheduleCare events={events}  currentUser={loggedInUser} caretimes={caretimes} pickedChildId={currentChild.id} pickedChild={currentChild}/>}/>
						<Route path="/messages" element={<Messages usertype={usertype} currentUser={loggedInUser}/>}/>
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
			}
		</div>
	)



 
}

export default App