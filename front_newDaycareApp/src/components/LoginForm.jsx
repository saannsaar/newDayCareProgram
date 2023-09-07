/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useState } from 'react'
import { Button, TextField, Select, MenuItem} from '@mui/material'
import loginService from '../services/login'
import childService from '../services/children'
import { useDispatch } from 'react-redux'
import { initializeCurrentWorker } from '../reducers/CurrentUser'
import { initializeUserType } from '../reducers/UserType'



const LoginForm = (  ) => {
	const [userEmail, setuserEmail] = useState('')
	const [password, setPassword] = useState('')
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState('')
	const [usertype, setUserType] = useState('')

	const dispatch = useDispatch()

	const handleUsertypeChange = (event) => {
		console.log(event.target.value)
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
		  childService.setToken(user.token)
		  dispatch(initializeUserType(usertype))
		  dispatch(initializeCurrentWorker(user))
		  setuserEmail('')
		  setPassword('')
		  setUserType('')
		 
		} catch(exception) {
			console.log(exception)
			setError(exception)
			setTimeout(() => {
				setError(null)
			}, 4000)
	
		}
	}

	return (
		<>
			<div>
				<h2>Login to newDayCareApp</h2>
				{error ? <h3 style={{width: '30%', color: '#f0562b'}}>{error.response.data.error}</h3> : null}
				<form onSubmit={submit}> 
					<div style={{marginBottom: '10px'}}>
						<Select
							value={usertype}
							label="Käyttäjätyyppi"
							onChange={handleUsertypeChange}
						>
							<MenuItem value={'parent_user'}>Vanhempi</MenuItem>
							<MenuItem value={'worker_user'}>Työntekijä</MenuItem>
						</Select>
					</div>
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