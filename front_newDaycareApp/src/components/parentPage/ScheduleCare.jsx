import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Container,  Typography, Card, Grid } from '@mui/material'

import Item from '../Item'
import moment from 'moment'
import EventInfo from '../EventInfo'
import AddCareTime from '../AddCaretime'
import CareTimeInfo from '../CareTimeInfo'
import ErrorAlert from '../ErrorAlert'


// This page is only for parent-users. 
// Component to render a page where a parent user can add caretimes for their child/children
// through a calendar and form. There is a funcionality that shows the maximum caretime for each child and
// when a user adds a new caretime to the system the page shos how much time there is left for that specific month
// Since usually at least in Finland children are granted a specific maximum time for daycare per month
// this funcionality helps parents to use the daycare booking system more quickly and easily. 
// User can also modify or delete already existing booked caretimes. 
const ScheduleCare = ({ events, pickedChild, pickedChildId }) => {
	moment.locale('fin')
	console.log(pickedChild)
	const adapter = new AdapterDayjs()

	const firstAvailableDay = adapter.date(new Date())

	if ( !pickedChild || pickedChild == null) {
		return (
			<div> Laoding... </div>
		)
	} else {

		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
		const [pickedMonth, setPickedMonth] = useState('')
		const [selectedCaretime, setSelectedCaretime] = useState('')
		const [changed, setChanged] = useState(true)
	
		useEffect(() => {
			const findTimeLeft = pickedChild.caretimes_added_monthlysum.filter((m) => m.month == moment(calendarValue.$d).format('MM'))
			if (findTimeLeft.length == 0) {
				setPickedMonth(pickedChild.monthly_maxtime.toString().concat(' tuntia'))
			} else {

				const hoursLeftThisMonth = Math.floor(findTimeLeft[0].timeLeft / 60) + ' tuntia, ' + findTimeLeft[0].timeLeft % 60 + ' minuuttia'
				setPickedMonth(hoursLeftThisMonth)
			}

			const find_events = events.filter((e) => moment(new Date(e.date)).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
			setPickedEvents(find_events)

		
			const find_caretime = pickedChild.care_time.filter((c) => moment(c.start_time).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
			if (!find_caretime) {
				setSelectedCaretime('')
			} else {
				setSelectedCaretime(find_caretime)
			}
		
		}, [calendarValue.$d, pickedChild.care_time.length, changed, pickedChild])


		return (
			<>
			
				<Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Max hoitoaika: {pickedChild.monthly_maxtime} tuntia
				</Typography>
				<Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Jäljellä hoitoaika kuukaudelle: {pickedMonth} tuntia
				</Typography>
				<ErrorAlert />
				{pickedChild &&
			<Container>
				<Card>
					<Grid container spacing={2}>
						<Grid item xs={8}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateCalendar displayWeekNumber value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={4}>
							<Item style={{margin: '10px'}}>
								{moment(calendarValue.$d).format('MMM Do YY')}
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <><Item style={{margin: '10px'}} >Ei tapahtumia</Item> </>}

							{selectedCaretime == '' ? <><Item  style={{margin: '10px'}}>Ei ilmoitettua hoitoaikaa</Item> 
								<AddCareTime  pickedChildId={pickedChildId} kid={pickedChild} pickedDay={calendarValue.$d} setChanged={setChanged} changed={changed}/></> :
								<CareTimeInfo key={selectedCaretime._id} kid={pickedChild} childId={pickedChildId} pickedCareTimes={selectedCaretime} /> 
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
	

}

export default ScheduleCare