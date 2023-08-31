/* eslint-disable react/prop-types */

import { useState } from 'react'
import { TextField, Grid, Button } from '@mui/material'

/* eslint-disable react/react-in-jsx-scope */
const EditUserInfoForm = ({onSubmit, onClose }) => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')


	const editUser = (event) => {
		event.preventDefault()

		onsubmit({name, phone, email})
	}
	console.log(onSubmit, onClose)
	return (
		<div>
			<form onSubmit={editUser}>
				<TextField
					label="Nimi: "
					fullWidth 
					value={name}
					onChange={({ target }) => setName(target.value)}
				/>
				<TextField
					label="Sähköposti: "
					fullWidth
					value={email}
					onChange={({ target }) => setEmail(target.value)}
				/>
				<TextField
					label="Puhelinnumero: "
					fullWidth
					value={phone}
					onChange={({ target }) => setPhone(target.value)}
				/>
				

				<Grid>
					<Grid item>
						<Button
							color="secondary"
							variant="contained"
							style={{ float: 'left' }}
							type="button"
							onClick={onClose}>
              Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: 'right',
							}}
							type="submit"
							variant="contained">
                            Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	)
}

export default EditUserInfoForm