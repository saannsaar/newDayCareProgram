/* eslint-disable react/prop-types */

/* eslint-disable react/react-in-jsx-scope */

import { Container, Box } from '@mui/material'
import Item from './Item'


const Daycare = ( { workers, groups } ) => {

	console.log(workers)
	console.log(groups)
	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					p: 1,
					m: 1,
					borderRadius: 1,
					width: '100%',
				}}
			>
				<Item> Kuva? </Item>
				<Item> <h3>Työntekijät:</h3>
					{workers.map((worker) => (
						<Item key={worker.name}> {worker.name}</Item>
					))}
				</Item>
				<Item><h3>Ryhmät:</h3>
					{groups.map((group) => (
						<Item key={group.name}> {group.name} </Item>
					))}</Item>
			</Box>
		</Container>
	)
}

export default Daycare

