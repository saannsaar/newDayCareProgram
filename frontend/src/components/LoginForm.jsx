/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOG_IN } from '../queries'
import { Button, TextField } from '@mui/material'

const LoginForm = ({ setToken }) => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [error, setError] = useState('')


	const [login, result] = useMutation(LOG_IN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
			setTimeout(() => {
				setError(null)
			}, 5000)
		}
	})

	useEffect(() => {
		if ( result.data ) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('library-user-token', token)
		}
	})

	const submit = async (event) => {
		event.preventDefault()

		login({ variables: { email, password }})
	}

	return (
		<>
			<div>
				<h2>Login to newDayCareApp</h2>
				<form onSubmit={submit}> 
					<div>
						<TextField label="email" value={email} onChange={({ target }) => setEmail(target.value)} />
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
			{error ? <div>
				{error}
			</div> : null}
		</>

	)
}

export default LoginForm