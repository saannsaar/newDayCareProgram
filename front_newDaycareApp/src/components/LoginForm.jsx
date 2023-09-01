/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useState } from 'react'
import { Button, TextField } from '@mui/material'
import loginService from '../services/login'
import childService from '../services/children'
import { useDispatch } from 'react-redux'
import { initializeCurrentWorker } from '../reducers/CurrentUser'


const LoginForm = ( ) => {
	const [userEmail, setuserEmail] = useState('')
	const [password, setPassword] = useState('')

	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState('')

	const dispatch = useDispatch()


	

	const submit = async (event) => {
		event.preventDefault()

		try {
 	  const user = await loginService.login({
				email: userEmail,
				password,
		  })
	
		  window.localStorage.setItem('loggedDaycareAppUser', JSON.stringify(user))
		  childService.setToken(user.token)
		 
		  dispatch(initializeCurrentWorker(user))
		  setuserEmail('')
		  setPassword('')
		 
		} catch(exception) {
			console.log(exception)
			setError(exception)
	
		}
	}

	return (
		<>
			<div>
				<h2>Login to newDayCareApp</h2>
				<form onSubmit={submit}> 
					<div>
						<TextField label="email" value={userEmail} onChange={({ target }) => setuserEmail(target.value)} />
					</div>
					<div>
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