import Item from '../Item'
import moment from 'moment'
import { useEffect, useState } from 'react'
import {  Grid, List, ListItem, ListItemText, Container, Box } from '@mui/material'

import GroupInfo from '../GroupInfo'

import DaycareInfo from './DaycareInfo'
import ChildInfo from '../parentPage/ChildInfo'
import AddNewChild from './AddNewCHild'
const Daycare = ( {  groups, kids, daycare, usertype } ) => {
	const [selectedChild, setSelectedChild] = useState({})

	const [todaysCaretimes, setTodaysCaretimes] = useState([])
	const today = new Date()
	console.log(kids)
	useEffect(() => {
		let apuarr = []
		for (let i = 0; i < kids.length; i++) {
			
			if (kids[i].care_time.length > 0) {

				const findCaretime = kids[i].care_time.filter((c) => moment(c.start_time).format('MMM Do YY') == moment(today).format('MMM Do YY') )
				console.log('MOI', kids[i].name, findCaretime)
				if (findCaretime.length >= 1) {
					console.log(findCaretime[0].start_time)
					console.log(moment(findCaretime[0].start_time).format('HH:mm'))
					apuarr.push({start: findCaretime[0].start_time, end: findCaretime[0].end_time, kid: kids[i].name})
				}
			}
		}

		setTodaysCaretimes(apuarr)
 
	}, [])

	const handleKidNameClick = (kid) => {
		console.log(kid.name)
		setSelectedChild(kid)
	}

	

	return (
		<div style={{overflow: 'scroll', paddingBottom: '100px'}}><Container>
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
				<DaycareInfo daycare={daycare}/>

	
				<Item sx={{ p: 1, m: 1 }}><h3>Ryhmät</h3>
					{groups.map((group, index) => (

						
						<GroupInfo key={index} group={group} kids={kids} />
					))}</Item>
				<Item sx={{ p: 1, m: 1 }}>
					<h3>Tänään hoidossa</h3>
					{todaysCaretimes.map((tCT) => (

						
						<Item key={tCT.kid.concat('c')} style={{ color: '#000000', backgroundColor: '#a4f5af', marginBottom: '4px' }}> {tCT.kid}: {moment(tCT.start).format('HH:mm')} - {moment(tCT.end).format('HH:mm')} </Item>
						
					))}
				</Item>
			</Box>
		</Container>

		<Container>
			<Grid margin={1} container spacing={2}>
				
				<Grid item xs={4}>
					<Item style={{width: 'fit-content'}}>
						<List>
							<AddNewChild daycare={daycare} groups={groups} />
							{kids.map((k, index) => (
								<ListItem style={{borderBlockEnd: 'dashed #cfcccc'}} key={index} value={k.name} onClick={() => handleKidNameClick(k)}>
									<ListItemText>{k.name}</ListItemText>
								</ListItem> 
							))}
						</List>
					</Item>
				
				</Grid>
				<Grid item xs={8}>
					{selectedChild.name ? <ChildInfo kidinfo={selectedChild} usertype={usertype}/>: null }
				</Grid>
			</Grid>
		</Container></div>
	)
}

export default Daycare

