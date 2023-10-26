/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import Item from '../Item'
import moment from 'moment'
import EventInfo from '../EventInfo'
import AddCareTime from '../AddCaretime'
import CareTimeInfo from '../CareTimeInfo'


const ScheduleCare = ({ events, pickedChild, caretimes, currentUser, pickedChildId }) => {
	moment.locale('fin')
	const currentDay = moment(moment().format('yyyy-MM-DD HH:mm'))
	console.log(currentDay)

	// console.log(events)
	console.log( pickedChild, currentUser)
	const adapter = new AdapterDayjs()
	const this_worker = useSelector(state => state.currentUser)
	console.log(this_worker)
	const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
	const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
	const [pickedEvents, setPickedEvents] = useState([])
	const [selectedChildsCaretimes, setSelectedChildsCaretimes] = useState('')
	const [selectedCaretime, setSelectedCaretime] = useState('')

	// console.log(calendarValue.$d)
	
	// console.log(moment(events[0].date).format('MMM Do YY'))
	// console.log(moment(calendarValue.$d).format('MMM Do YY'))


	useEffect(() => {
		const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		// console.log(find_events)
		setPickedEvents(find_events)

		if (selectedChildsCaretimes.length > 0) {
			for (let i = 0; i < selectedChildsCaretimes[0].length; i++) {
				console.log(selectedChildsCaretimes[0][i])
				console.log(moment(selectedChildsCaretimes[0][i].start_time).format('MMM Do YY'))
				console.log(moment(calendarValue.$d).format('MMM Do YY'))
				if (moment(selectedChildsCaretimes[0][i].start_time).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY')) {
					setSelectedCaretime(selectedChildsCaretimes[0][i])
				}
			}
		}
		// console.log(pickedEvents)
		// console.log(find_events.length)
	}, [calendarValue.$d])

	useEffect(() => {
		const foundCaretimes = caretimes.filter((ct) => ct.kid == pickedChild.id)
		setSelectedChildsCaretimes(foundCaretimes)
	}, [pickedChild])


	return (
		<>
			
			<Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Ilmoita hoitoajat 
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
							<Item>
								{moment(calendarValue.$d).format('MMM Do YY')}
							</Item>
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <><Item>Ei tapahtumia</Item> </>}
							{selectedCaretime  ?  <CareTimeInfo key={selectedCaretime.id}  pickedCareTimes={selectedCaretime}/> :  <><Item>Ei ilmoitettua hoitoaikaa</Item> <AddCareTime pickedChildId={pickedChildId} kid={pickedChild} pickedDay={calendarValue.$d}/></>}
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