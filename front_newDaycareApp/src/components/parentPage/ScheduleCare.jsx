/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid } from '@mui/material'

import Item from '../Item'
import moment from 'moment'
import EventInfo from '../EventInfo'
import AddCareTime from '../AddCaretime'
import CareTimeInfo from '../CareTimeInfo'


const ScheduleCare = ({ events, pickedChild, caretimes, currentUser, pickedChildId }) => {
	moment.locale('fin')
	const adapter = new AdapterDayjs()
	const firstAvailableDay = adapter.date(new Date())

	if (!caretimes) {
		return (
			<div> Laoding... </div>
		)
	}
	// console.log(events)
	console.log(currentUser)
	const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
	const [pickedEvents, setPickedEvents] = useState([])
	
	const [selectedCaretime, setSelectedCaretime] = useState('')

	// console.log(calendarValue.$d)
	
	// console.log(moment(events[0].date).format('MMM Do YY'))
	// console.log(moment(calendarValue.$d).format('MMM Do YY'))


	useEffect(() => {
		
		console.log(calendarValue)
		const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		// console.log(find_events)
		setPickedEvents(find_events)
		console.log(caretimes[0])
	
		const find_caretime = caretimes.filter((c) => moment(c.start_time).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		console.log(find_caretime)
		if (!find_caretime) {
			setSelectedCaretime('')
		} else {
			setSelectedCaretime(find_caretime)
		}
		
		
		// console.log(find_events.length)
	}, [calendarValue.$d])

	console.log(selectedCaretime)


	return (
		<>
			
			<Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Max hoitoaika: {pickedChild.monthly_maxtime} tuntia
			</Typography>
			{pickedChild &&
			<Container>
				<Card>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={4}>
							<Item style={{margin: '10px'}}>
								{moment(calendarValue.$d).format('MMM Do YY')}
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <><Item style={{margin: '10px'}} >Ei tapahtumia</Item> </>}

							{selectedCaretime == '' ? <><Item  style={{margin: '10px'}}>Ei ilmoitettua hoitoaikaa</Item> 
								<AddCareTime pickedChildId={pickedChildId} kid={pickedChild} pickedDay={calendarValue.$d}/></> :
								<CareTimeInfo key={selectedCaretime._id} childId={pickedChildId} pickedCareTimes={selectedCaretime}/> 
							}
						</Grid>
					</Grid>
				</Card>
				<Container>
	
				</Container>
			</Container>}
		</>
			
	)
}

export default ScheduleCare