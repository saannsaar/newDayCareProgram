import { Container, Grid, Typography, Button } from '@mui/material'
import { useState } from 'react'
import Item from '../Item'

const MyFamily = ({ user, kids }) => {

	const [showPage, setShowPage] = useState('Lapsetsivu')
	const handleKidPage = () => {
		setShowPage('Lapsetsivu')
	}

	const handleOwnInfoPage = () => {
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
							{showPage == 'Lapsetsivu' ? <Grid container spacing={2}>{kids.map((k)=> <><Grid key={k.name}item xs={4}>
								<Item>KUVA </Item>
							</Grid><Grid item xs={8}>
								<Item>{k.name}</Item>
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

