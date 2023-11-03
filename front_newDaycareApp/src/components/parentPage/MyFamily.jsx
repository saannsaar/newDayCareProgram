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

	console.log(user, kids)
	console.log(kids.map(k=>k.name))

	const [showPage, setShowPage] = useState('Lapsetsivu')
	console.log(showPage)
	const handleKidPage = () => {
		console.log('Lapset')
		setShowPage('Lapsetsivu')
	}

	const handleOwnInfoPage = () => {
		console.log('Omat tiedot')
		setShowPage('Omattiedotsivu')
	}
	return (
		<Container>
			<Typography variant="h4" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
				Minun perheeni
			</Typography>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Item><Button onClick={handleKidPage}>Lapset</Button>
							<Button  onClick={handleOwnInfoPage}>Omat tiedot</Button>
						</Item>
					</Grid>
					<Grid item xs={8}>
						<Item>
							{showPage == 'Lapsetsivu' ? <Grid container spacing={2}>{kids.map(k=> <><Grid item xs={4}>
								<Item>KUVA </Item>
							</Grid><Grid item xs={8}>
								<Item>{kids[0].name}</Item>
							</Grid></>)}</Grid> : showPage == 'Omattiedotsivu' ? <Grid container spacing={2}>
								<Grid item xs={4}>
									<Item>Nimi: </Item>
								</Grid>
								<Grid item xs={8}>
									<Item>{user.name}</Item>
								</Grid>
								<Grid item xs={4}>
									<Item>Sähköposti: </Item>
								</Grid>
								<Grid item xs={8}>
									<Item>{user.email}</Item>
								</Grid>
							</Grid> : null}
						</Item>
					</Grid>
				</Grid>
				
			</Container>
		</Container>
	)


}

export default MyFamily

