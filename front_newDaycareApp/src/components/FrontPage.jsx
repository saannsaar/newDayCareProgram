/* eslint-disable for-direction */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid } from '@mui/material'
import Item from './Item'
import moment from 'moment'
import EventInfo from './EventInfo'
import CareTimeInfo from './CareTimeInfo'



const FrontPage = ({ events, kids, currentUser, usertype }) => {


	if (usertype == 'parent_user' && kids) {
		
		console.log('PARENT FRONTPAGE')
		moment.locale('fin')
		console.log(kids)

		if(!events) {
			return (
				<div>
					Loading..
				</div>
			)
		}

		
		// eslint-disable-next-line no-unused-vars
		const [childsGroup, setchildsGroup] = useState(kids.map((k) => k.group))
		const adapter = new AdapterDayjs()
		const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
		
		console.log(calendarValue.$d)
		
		console.log(moment(events[0].date).format('MMM Do YY'))
		console.log(moment(calendarValue.$d).format('MMM Do YY'))
		
		console.log(childsGroup)
		
		// TODO: Nyt näkyy vaan ensimmäisen lapsen tiedot, pitää toteuttaa
		// niin että kaikki lapset näkyvät
		useEffect(() => {
			console.log(events)
			const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY') && childsGroup.includes(e.group.id))
			console.log(find_events)
			setPickedEvents(find_events)
	
			console.log(moment(calendarValue.$d).format('MMM Do YY'))
		}, [calendarValue.$d])
	
		return (
			<><Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
				Tervetuloa NewDayCareAppiin {currentUser.name}
			</Typography><Container>
				<Card>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={4}>
							<Item>
								{moment(calendarValue.$d).format('MMM Do YY')}   
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <Item>Ei tapahtumia</Item>}
							
						</Grid>
					</Grid>
				</Card>
				<Container>
			
				</Container>
			</Container></>
				
		)
	} 
	
	
	
	else {
		console.log('WORKER FRONTPAGE')
		moment.locale('fin')
		console.log(kids)
		if(!events) {
			return (
				<div>
					Loading..
				</div>
			)
		}
		const adapter = new AdapterDayjs()
		const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
		const [pickedCareTimes, setPickedCareTiems] = useState([])
		
		console.log(calendarValue.$d)
		
		console.log(moment(events[0].date).format('MMM Do YY'))
		console.log(moment(calendarValue.$d).format('MMM Do YY'))
		console.log(pickedCareTimes)
	
		// TODO: Nyt näkyy vaan ensimmäisen lapsen tiedot, pitää toteuttaa
		// niin että kaikki lapset näkyvät
		useEffect(() => {
			const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
			console.log(find_events)
			setPickedEvents(find_events)
			console.log(kids[0].care_time)

			if (kids) {
				const apuarr = []
				for (let i = 0; i < kids.length; i++) {
					console.log(kids[i])
					for (let o = 0; o < kids[i].care_time.length; o++) {
						console.log(kids[i].care_time[o])
						if (moment(kids[i].care_time[o].date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
							apuarr.push(kids[i].care_time[o])
						console.log(kids[i])
						console.log(apuarr)
					} 
				}
				setPickedCareTiems(apuarr)
			}
			
			
			console.log(pickedCareTimes)
			console.log(find_events.length)
		}, [calendarValue.$d])
	
		return (
			<><Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
				Tervetuloa NewDayCareAppiin {currentUser.name}
			</Typography><Container style={{background: '#f2f6fc'}}>
				<Card >
					<Grid container spacing={2} >
						<Grid item xs={8}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={4}>
							<Item>
								{moment(calendarValue.$d).format('MMM Do YY')}
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <Item>Ei tapahtumia</Item>}
							{pickedCareTimes.length > 0 ? pickedCareTimes.map((c) => <CareTimeInfo key={c.id}  pickedCareTimes={c}/> ) : null}
							
						</Grid>
					</Grid>
				</Card>
				<Container>
			
				</Container>
			</Container></>
				
		)
	}
	
}

export default FrontPage