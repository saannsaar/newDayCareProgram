/* eslint-disable react/prop-types */

/* eslint-disable react/react-in-jsx-scope */

import { Container, Box, Typography } from '@mui/material'
import Item from '../Item'

import logopic from '../../pictures/examplelogo.png'
const Daycare = ( { workers, groups, kids, daycare } ) => {

	console.log(workers)
	console.log(groups)
	console.log(daycare)
	console.log(kids)
	return (
		<Container>
			<h3>{daycare.name}</h3>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					p: 1,
					m: 1,
					borderRadius: 1,
					width: 1,
				}}
			>
				<Item sx={{p:1, m:1}}> 
					<img src={logopic} width='100px'alt='example logo'/> 
					<Typography  style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.address}</Typography>
					<Typography  style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.email}</Typography>
					<Typography  style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.phone}</Typography></Item>

				<Item sx={{p:1, m:1}}> <h3>Työntekijät:</h3>
					{workers.map((worker) => (
						<Item key={worker.name}> {worker.name}</Item>
					))}
				</Item>
				<Item sx={{p:1, m:1}} ><h3>Ryhmät:</h3>
					{groups.map((group) => (
						<Item key={group.name}> {group.name} </Item>
					))}</Item>
				<Item sx={{p:1, m:1}}>TÄLLÄ VIIKOLLA</Item>
			</Box>
		</Container>
	)
}

export default Daycare

