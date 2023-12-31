import {  useState } from 'react'
import { Button, TextField, Select, MenuItem, Typography } from '@mui/material'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { initializeCurrentWorker, removeCurrentUser } from '../reducers/CurrentUser'
import { initializeUserType, removeType } from '../reducers/UserType'
import  childService from '../services/children'
import parentService from '../services/parents'
import eventService from '../services/events'
import groupService from '../services/groups'
import workerService from '../services/workers'
import notiservice from '../services/notiservice'
import messageService from '../services/message'
import { removeCaretimes } from '../reducers/CaretimeReducer'
import { removeDaycare } from '../reducers/DaycareReducer'
import { removeChildren } from '../reducers/ChildReducer'
import { removeGroups } from '../reducers/GroupReducer'
import { removeEvents } from '../reducers/EventReducer'
import { removeCurrentCHild } from '../reducers/CurrentChild'
import { emptyMessages } from '../reducers/MessageReducer'

// A component for the login form which takes useremail and password and type of user as inputs 
// while logging in. The user information that comes back as a result from the server
// is then saved to localStorage which is cleaned after 10 minutes. Token is also set for every servie component
// that handles the communication with the backend.
const LoginForm = ( {setLoggedIn} ) => {
	const [userEmail, setuserEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [usertype, setUserType] = useState('parent_user')
	const dispatch = useDispatch()


	const handleUsertypeChange = (event) => {
		setUserType(event.target.value)
	}


	const submit = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				email: userEmail,
				password,
				user_type: usertype
			})
	
			
			window.localStorage.setItem('loggedDaycareAppUser', JSON.stringify(user))
			setTimeout(() => {
				window.localStorage.removeItem('loggedDaycareAppUser')
				dispatch(removeCurrentUser())
				dispatch(removeCaretimes())
				dispatch(removeDaycare())
				dispatch(removeType())
				dispatch(removeChildren())
				dispatch(removeGroups())
				dispatch(removeEvents())
				dispatch(emptyMessages())
				dispatch(removeCurrentCHild())

			}, [600000])

			if (user){
				parentService.setToken(user.token)
				childService.setToken(user.token)
				eventService.setTokenForEvent(user.token)
				groupService.setToken(user.token)
				workerService.setToken(user.token)
				notiservice.setToken(user.token)
				messageService.setToken(user.token)
			}
			setLoggedIn(true)
			dispatch(initializeUserType(usertype))
			dispatch(initializeCurrentWorker(user))
			setuserEmail('')
			setPassword('')
			setUserType('')
		} catch(exception) {
			setError(exception)
			setTimeout(() => {
				setError(null)
			}, 4000)
	
		}
	}

	return (
		<>
			<div style={{textAlign: 'center'}}>
				<Typography variant="h4" marginBottom={2} marginTop={2}>Kirjaudu sisään</Typography>
				{error ? <h3 style={{width: '30%', color: '#f0562b'}}>{error.response.data.error}</h3> : null}
				<div style={{marginBottom: '10px'}}>
					<Select
						value={usertype}
						label="Kirjautumistyyppi"
						onChange={handleUsertypeChange}
					>
						<MenuItem value={'parent_user'}>Vanhempi</MenuItem>
						<MenuItem value={'worker_user'}>Työntekijä</MenuItem>
					</Select>
				</div>
				<form onSubmit={submit} style={{border: '10px inset #89b0a0',borderRadius: '5px', padding: '20px', display: 'inline-block', backgroundImage: 'linear-gradient(to bottom right, #cbb6e3, #adedd2)'}}> 
					<div style={{marginBottom: '10px'}}>
						<TextField label="Sähköposti" value={userEmail} onChange={({ target }) => setuserEmail(target.value)} />
					</div>
					<div style={{marginBottom: '10px'}}>
						<TextField type="password" label="Salasana" value={password} onChange={({ target }) => setPassword(target.value)} />
					</div>
					<div>
						<Button variant="contained" color="primary" type="submit">
                        Login
						</Button>
					</div>
				</form>

			
			</div>
		
		</>

	)
}

export default LoginForm