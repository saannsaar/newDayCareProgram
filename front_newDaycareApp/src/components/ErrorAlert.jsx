/* eslint-disable react/react-in-jsx-scope */
import { useSelector } from 'react-redux'
import {  Alert } from '@mui/material'
const ErrorAlert = () => {

	const error = useSelector(state => state.errors)
	console.log(error)
	if (error.length == 0) {
		return null
	}

	if (error) {
		return(
			<div>
				<Alert style={{margin:'10px'}}severity='error'>
				
					{error}
				</Alert>
			</div>
		)
	}
	
}

export default ErrorAlert