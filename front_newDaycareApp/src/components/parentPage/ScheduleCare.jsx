/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid, Select, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'
import Item from '../Item'
import moment from 'moment'
import EventInfo from '../EventInfo'
import AddCareTime from '../AddCaretime'


const ScheduleCare = ({ events, kids, currentUser  }) => {
	moment.locale('fin')
	const currentDay = moment(moment().format('yyyy-MM-DD HH:mm'))
	console.log(currentDay)

	console.log(events)
	console.log( kids, currentUser)
	const adapter = new AdapterDayjs()
	const this_worker = useSelector(state => state.currentUser)
	console.log(this_worker)
	const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
	const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
	const [pickedEvents, setPickedEvents] = useState([])
	const [pickedChild, setPickedChild] = useState('')

	// console.log(calendarValue.$d)
	
	// console.log(moment(events[0].date).format('MMM Do YY'))
	// console.log(moment(calendarValue.$d).format('MMM Do YY'))

	const handlePickedChildChange = (event) => {
		console.log(event.target.value)
		setPickedChild(event.target.value)
	}
	useEffect(() => {
		const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY'))
		// console.log(find_events)
		setPickedEvents(find_events)
		// console.log(pickedEvents)
		// console.log(find_events.length)
	}, [calendarValue.$d])

	Object.values(kids).map((k)=> console.log(k.name))
	return (
		<>
			<div>
				Valitse lapsi:
				<Select value={pickedChild}
					label="Käyttäjätyyppi"
					onChange={handlePickedChildChange}>
					{Object.values(kids).map((k) => 
			
						<MenuItem key={k.name.concat('key')}value={k.name}> {k.name}</MenuItem>
					)}
				</Select>
			</div>
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
							{pickedEvents.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <><Item>Ei tapahtumia</Item> <AddCareTime kid={kids[0]}/></>}
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