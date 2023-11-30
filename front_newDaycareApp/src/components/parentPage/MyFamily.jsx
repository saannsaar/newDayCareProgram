import { Container, Grid, Typography, Button } from '@mui/material'
import { useState } from 'react'
import Item from '../Item'
import ChildInfo from './ChildInfo'


// This page is only for parent-users.
// Component that renders a page where a parent-user can see their own information
// and also their child's/childrens information including the diaper info which can be modified
// by a worker-user to inform if there are enough diapers for a child in the daycare.
// Parent-user can just view information here. 
const MyFamily = ({ user, usertype, kids }) => {

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
							{showPage == 'Lapsetsivu' ? <Grid container spacing={2}>{kids.map((k, index)=> <ChildInfo key={index} usertype={usertype}kidinfo={k} index={index}/>)}</Grid> : showPage == 'Omattiedotsivu' ? <Grid container spacing={2}>
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

