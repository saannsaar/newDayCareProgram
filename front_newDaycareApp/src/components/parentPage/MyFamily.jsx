/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Container, Divider, DialogContent, DialogTitle,  Dialog, Grid, TextField, Paper, Card, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { editUser } from '../../reducers/CurrentUser'
import Item from '../Item'

const MyFamily = ({ user, kids }) => {


	// const [modalOpen, setmodalOpen] = useState(false)
	// const dispatch = useDispatch()
	// const handleEditUser = (e) => {
	// 	e.preventDefault()

	// 	console.log({name, email, phone})
	// 	dispatch(editUser({name, email, phone, born}, this_worker.id))
	// 	setmodalOpen(false)
	// }
	// console.log(worker)
	// console.log(workers)
	// const this_worker = useSelector(state => state.currentUser)
	// console.log(this_worker)

	// const [name, setName] = useState(this_worker.name)
	// const [email, setEmail] = useState(this_worker.email)
	// const [phone, setPhone] = useState(this_worker.phone)
	// const [born, setBorn] = useState(this_worker.born)
	// const handleModalOpen = () => {
	// 	setmodalOpen(true)
	// }
	// const handleModalClose = () => {
	// 	setmodalOpen(false)
	// }
	
	return (
		<Container>
			<Typography variant="h4" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
				Minun perheeni
			</Typography>
			<Container>
				<Card>
					<Grid item xs={4}>
					
					</Grid>
				</Card>
			</Container>
		</Container>
	)


}

export default MyFamily

