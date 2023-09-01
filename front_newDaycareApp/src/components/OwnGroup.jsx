/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Container, Divider, DialogContent, DialogTitle,  Dialog, Grid, TextField, Paper, Card, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { editUser } from '../reducers/CurrentUser'
import Item from './Item'

const OwnGroup = ({ worker, workers }) => {

	const [modalOpen, setmodalOpen] = useState(false)

	const dispatch = useDispatch()

	const handleEditUser = (e) => {
		e.preventDefault()

		console.log({name, email, phone})
		dispatch(editUser({name, email, phone, born}, this_worker.id))
		setmodalOpen(false)
	}
	console.log(worker)
	console.log(workers)
	const this_worker = useSelector(state => state.currentUser)
	console.log(this_worker)

	const [name, setName] = useState(this_worker.name)
	const [email, setEmail] = useState(this_worker.email)
	const [phone, setPhone] = useState(this_worker.phone)
	const [born, setBorn] = useState(this_worker.born)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}



	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	return (
		<Container>
			<Typography variant="h4" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
				Omat tiedot
			</Typography>
			<Container>
				<Card >
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Item>Nimi: </Item>
						</Grid>
						<Grid item xs={8}>
							<Item>{this_worker.name}</Item>
						</Grid>
						<Grid item xs={4}>
							<Item>Sähköposti: </Item>
						</Grid>
						<Grid item xs={8}>
							<Item>{this_worker.email}</Item>
						</Grid>
						<Grid item xs={4}>
							<Item>Puhelinnumero: </Item>
						</Grid>
						<Grid item xs={8}>
							<Item>{this_worker.phone}</Item>
						</Grid>
						<Grid item xs={4}>
							<Item>Syntymäaika: </Item>
						</Grid>
						<Grid item xs={8}>
							<Item>{this_worker.born}</Item>
						</Grid>
					</Grid>
					<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
						<DialogTitle>Muokkaa käyttäjätietojasi</DialogTitle>
						<Divider />
						<DialogContent>
							<div>
								<form onSubmit={handleEditUser}>
									<TextField
										label="Nimi: "
										placeholder={this_worker.name}
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
									<TextField
										label="Syntymäaika: "
										fullWidth
										value={born}
									/>

									<Grid>
										<Grid item>
											<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
												onClick={() => handleModalClose()}> 
                                                Cancel 
											</Button>
										</Grid>
										<Grid item>
											<Button style={{ float: 'right', }} type="submit" variant="contained"> Add
											</Button>
										</Grid>
									</Grid>
								</form>
							</div>
						</DialogContent>
					</Dialog>
					<Button variant='contained' color='primary' onClick={() => handleModalOpen()}>Muokka tietoja</Button>
				</Card>
			</Container>
			
		</Container>
	)


}

export default OwnGroup

