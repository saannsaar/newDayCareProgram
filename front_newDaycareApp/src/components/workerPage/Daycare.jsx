/* eslint-disable react/prop-types */

/* eslint-disable react/react-in-jsx-scope */

import { Container, Box } from '@mui/material'
import Item from '../Item'


const Daycare = ( { workers, groups, kids, daycare } ) => {

	console.log(workers)
	console.log(groups)
	console.log(daycare)
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
				<Item sx={{p:1, m:1}}> Kuva? </Item>
				<Item sx={{p:1, m:1}}> <h3>Työntekijät:</h3>
					{workers.map((worker) => (
						<Item key={worker.name}> {worker.name}</Item>
					))}
				</Item>
				<Item sx={{p:1, m:1}} ><h3>Ryhmät:</h3>
					{groups.map((group) => (
						<Item key={group.name}> {group.name} </Item>
					))}</Item>
				<Item sx={{p:1, m:1}}><h3>Lapset:</h3>
					{kids.map((kid) => (
						<Item key={kid.name}> {kid.name} </Item>
					))}</Item>
				<Item sx={{p:1, m:1}}>TÄLLÄ VIIKOLLA</Item>
			</Box>
		</Container>
	)
}

export default Daycare

