import {  useState } from 'react'
import { Button, TextField, Select, MenuItem, Typography} from '@mui/material'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { initializeCurrentWorker } from '../reducers/CurrentUser'
import { initializeUserType } from '../reducers/UserType'
import  childService from '../services/children'
import parentService from '../services/parents'
import eventService from '../services/events'
import groupService from '../services/groups'
import workerService from '../services/workers'
import notiservice from '../services/notiservice'
import messageService from '../services/message'

const LoginForm = (  ) => {
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
		

			if (user){
				parentService.setToken(user.token)
				childService.setToken(user.token)
				eventService.setTokenForEvent(user.token)
				groupService.setToken(user.token)
				workerService.setToken(user.token)
				notiservice.setToken(user.token)
				messageService.setToken(user.token)
			}
 
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
						<TextField label="email" value={userEmail} onChange={({ target }) => setuserEmail(target.value)} />
					</div>
					<div style={{marginBottom: '10px'}}>
						<TextField label="password" value={password} onChange={({ target }) => setPassword(target.value)} />
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