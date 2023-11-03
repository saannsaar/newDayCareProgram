/* eslint-disable react/prop-types */

/* eslint-disable react/react-in-jsx-scope */

import { Container, Box, Typography } from '@mui/material'

import Item from '../Item'

// eslint-disable-next-line no-unused-vars
import moment from 'moment'
import logopic from '../../pictures/examplelogo.png'
import { useEffect, useState } from 'react'


import GroupInfo from '../GroupInfo'
const Daycare = ( { workers, groups, kids, daycare, caretimes } ) => {


	console.log(workers)
	console.log(groups)
	console.log(daycare)
	console.log(kids)
	console.log(caretimes)
	const [todaysCaretimes, setTodaysCaretimes] = useState([])
	

	// const [pickedChildForGroup, setPickedChildForGroup] = useState('')


	
	const today = new Date()
	console.log(moment(today).format('MMM Do YY'))
	useEffect(() => {
		let apuarr = []
		for (let i = 0; i < caretimes.length; i++) {
			console.log(moment(caretimes[i].start_time).format('MMM Do YY'))
			console.log(moment(today).format('MMM Do YY'))
			if (moment(today).format('MMM Do YY') == moment(caretimes[i].start_time).format('MMM Do YY')) {
				console.log('MOI')
				const findChildName = kids.filter((k) => k.id == caretimes[i].kid)
				console.log(findChildName)
				apuarr.push({ ...caretimes[i], kid: findChildName[0].name})
			}

		}
		setTodaysCaretimes(apuarr)
 
	}, [])

	

	console.log(todaysCaretimes)

	

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
						<Item style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }} key={worker.name}> {worker.name}</Item>
					))}
				</Item>
				<Item sx={{p:1, m:1}} ><h3>Ryhmät:</h3>
					{groups.map((group) => (
						
						// eslint-disable-next-line react/jsx-key
						<GroupInfo group={group} kids={kids}  />
					))}</Item>
				<Item sx={{p:1, m:1}}>
					<Typography style={{ color: '#000000', fontSize:'16px', marginTop: '1px', marginBottom: '0.5em' }}>Tänään hoidossa</Typography>
					{todaysCaretimes.map((tCT) => (
						
						<>
							<Item  key={tCT.kid.concat('c')}style={{color: '#000000', backgroundColor: '#a4f5af', marginBottom: '4px'}}> {tCT.kid}: {moment(tCT.start_time).format('HH:MM')} - {moment(tCT.end_time).format('HH:MM')} </Item> 
						</>
					))}
				</Item>
			</Box>
		</Container>
	)
}

export default Daycare

