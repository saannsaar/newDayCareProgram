import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container,  Typography, Card, Grid } from '@mui/material'

import Item from '../Item'
import moment from 'moment'
import EventInfo from '../EventInfo'
import AddCareTime from '../AddCaretime'
import CareTimeInfo from '../CareTimeInfo'
import ErrorAlert from '../ErrorAlert'




const ScheduleCare = ({ events, pickedChild, caretimes, pickedChildId }) => {
	moment.locale('fin')

	const adapter = new AdapterDayjs()
	const firstAvailableDay = adapter.date(new Date())

	if (!caretimes || !pickedChild) {
		return (
			<div> Laoding... </div>
		)
	}
	
	const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
	const [pickedEvents, setPickedEvents] = useState([])
	const [pickedMonth, setPickedMonth] = useState('')
	const [selectedCaretime, setSelectedCaretime] = useState('')
	useEffect(() => {
		const monthNumber = calendarValue.$M +1
		console.log(monthNumber.toString())
		console.log('PÄIVITÄ TÄTÄ')
		const findTimeLeft = pickedChild.caretimes_added_monthlysum.find((m) => m.month == monthNumber.toString())
		if (!findTimeLeft) {
			setPickedMonth(pickedChild.monthly_maxtime.toString().concat(' tuntia'))
		} else {
			console.log(findTimeLeft)
			const hoursLeftThisMonth = Math.floor(findTimeLeft.timeLeft / 60) + ' tuntia, ' + findTimeLeft.timeLeft % 60 + ' minuuttia'
			setPickedMonth(hoursLeftThisMonth)
		}

		const find_events = events.filter((e) => moment(new Date(e.date)).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		setPickedEvents(find_events)

		
		const find_caretime = caretimes.filter((c) => moment(c.start_time).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		if (!find_caretime) {
			setSelectedCaretime('')
		} else {
			setSelectedCaretime(find_caretime)
		}
		
	}, [calendarValue.$d, pickedChild, caretimes])


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
								<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
							</LocalizationProvider>
						</Grid>
						<Grid item xs={4}>
							<Item style={{margin: '10px'}}>
								{moment(calendarValue.$d).format('MMM Do YY')}
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <><Item style={{margin: '10px'}} >Ei tapahtumia</Item> </>}

							{selectedCaretime == '' ? <><Item  style={{margin: '10px'}}>Ei ilmoitettua hoitoaikaa</Item> 
								<AddCareTime  pickedChildId={pickedChildId} kid={pickedChild} pickedDay={calendarValue.$d}/></> :
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