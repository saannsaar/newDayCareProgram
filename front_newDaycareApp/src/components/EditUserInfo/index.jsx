/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Grid, Button, DialogTitle, DialogContent, Divider, TextField } from '@mui/material'


import { useState } from 'react'


const EditUserModal = ({ modalOpen, onClose, handleSubmit }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	console.log(onClose, modalOpen)

	const editUser = (event) => {
		event.preventDefault()

		handleSubmit({name, phone, email})
	}

	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Muokkaa käyttäjätietojasi</DialogTitle>
		<Divider />
		<DialogContent>
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
		</DialogContent>
	</Dialog>
}

export default EditUserModal