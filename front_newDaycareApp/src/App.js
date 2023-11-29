
import {  useEffect, useState } from 'react'
import { AppBar, Toolbar, Select, Button, MenuItem } from '@mui/material'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeChildren, removeChildren } from './reducers/ChildReducer'
import {  initializeWorkers } from './reducers/WorkersReducer'
import OwnInfo from './components/workerPage/OwnInfo'
import {  initializeCurrentWorker, removeCurrentUser } from './reducers/CurrentUser'
import axios from 'axios'
import Messages from './components/Messages'
import Daycare from './components/workerPage/Daycare'
import  childService from './services/children'
import parentService from './services/parents'
import eventService from './services/events'
import groupService from './services/groups'
import workerService from './services/workers'
import notiservice from './services/notiservice'
import messageService from './services/message'

import { initializeEvents, removeEvents } from './reducers/EventReducer'
import { initializeGroups, removeGroups } from './reducers/GroupReducer'
import { initializeDaycare, removeDaycare } from './reducers/DaycareReducer'
import ScheduleCare from './components/parentPage/ScheduleCare'
import MyFamily from './components/parentPage/MyFamily'
import { initializeCaretimes, removeCaretimes } from './reducers/CaretimeReducer'
import { initializeUserType, removeType } from './reducers/UserType'
import { initializeCurrentChild, removeCurrentCHild } from './reducers/CurrentChild'
import { emptyNotifications, initializeNotifications } from './reducers/NotificationReducer'
import { initializeConversation } from './reducers/ConversationsReducer'
import LoadingIcons from 'react-loading-icons'


const App = () => {

	const dispatch = useDispatch()
	const [weather, setWeather] = useState(null)
	const [loggedIn, setLoggedIn] = useState(false)
	// eslint-disable-next-line no-undef
	const api_key = process.env.REACT_APP_WEATHER_API_KEY
	

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
			dispatch(initializeCaretimes(kids))
			
			
		}
		
		if (loggedInUser && usertype == 'parent_user') {
			setPickedChild(loggedInUser.children[0].id)
			dispatch(initializeCurrentChild(loggedInUser.children[0]))
		}
		
		
		
	}, [loggedInUser, kids.length])

	useEffect(() => {
		
		if (loggedInUser && kids.length != 0 && currentChild) {
			console.log('HALOO TÄÄL', loggedInUser, usertype, kids, currentChild)
			dispatch(initializeCaretimes(kids))
		}
	}, [loggedInUser, kids, currentChild])

	useEffect(() => {
		if(daycare) {
			console.log(daycare.cityName)
			axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${daycare.cityName},fi&appid=${api_key}&units=metric`)
				.then((response) => {
					console.log('weather', response.data)
					setWeather(response.data)
				})
		}
		
	},[daycare])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedDaycareAppUser')
		console.log(loggedUserJSON)
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			parentService.setToken(user.token)
			childService.setToken(user.token)
			eventService.setTokenForEvent(user.token)
			groupService.setToken(user.token)
			workerService.setToken(user.token)
			notiservice.setToken(user.token)
			messageService.setToken(user.token)
			dispatch(initializeUserType(user.user_type))
			dispatch(initializeCurrentWorker(user))
		}
	},[])

	const handlePickedChildChange = (event) => {
		setPickedChild(event.target.value)
		const findChild = loggedInUser.children.find((d) => d.id == event.target.value)
		dispatch(initializeCurrentChild(findChild))

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
		dispatch(removeCurrentCHild())
		setLoggedIn(false)
		
		console.log(loggedInUser)}


	if (loggedIn === true && usertype ==='parent_user' && (!kids || !events || !caretimes || !currentChild || !allNotifications || !weather) || usertype ==='worker_user' && (!kids || !events || !caretimes || !allNotifications || !weather || !workers) ) {
		console.log(loggedIn)
		return(
			<div style={{ display: 'flex', alignItems: 'center', jusitfyContent: 'center', height:'100%', width: '100%'}}>
				<LoadingIcons.Oval style={{left: '50%', top:'50%', alignSelf: 'center', position: 'fixed'}}stroke="#5d756b" speed={.75}/>
			</div>
				
		)
	}
	
	return(
		<div>
			{!loggedInUser && 
			<LoginForm  setLoggedIn={setLoggedIn}/>
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
							<Button color="inherit" component={Link} to="/own-info">Omat tiedot</Button>
							}
							{usertype == 'parent_user' &&
													<><Button color="inherit" component={Link} to="/caretimes">Hoitoajat</Button><Button color="inherit" component={Link} to="/own-family">Oma perhe</Button></>}
							
							<Button color="inherit"  onClick={logout}>Kirjaudu ulos</Button>
						
						</Toolbar>
					</AppBar>
 
 


					<Routes>
						<Route path="/" element={<FrontPage groups={groups}weather={weather} notifications={allNotifications} events={events} kids={kids} usertype={usertype}/>}/>
						<Route path="/own-info" element={<OwnInfo />}/>
						<Route path="/own-family" element={<MyFamily user={loggedInUser} kids={kids}/>}/>
						<Route path="/caretimes" element={<ScheduleCare events={events}  currentUser={loggedInUser} caretimes={caretimes} pickedChildId={currentChild.id} pickedChild={currentChild}/>}/>
						<Route path="/messages" element={<Messages usertype={usertype} currentUser={loggedInUser}/>}/>
						<Route path="/daycare" element={<Daycare caretimes={caretimes} workers={workers} groups={groups} kids={kids} daycare={daycare} usertype={usertype}/>}/>
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