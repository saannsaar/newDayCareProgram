/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import Item from './Item'
import moment from 'moment'

const FrontPage = ({ events }) => {
	moment.locale('fin')

	console.log(events)
	const adapter = new AdapterDayjs()
	const this_worker = useSelector(state => state.currentUser)
	const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
	const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
	console.log(calendarValue.$d)
	console.log(moment(events[0].date).format('MMM Do YY'))
	

	return (
		<><Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Tervetuloa NewDayCareAppiin {this_worker.name}
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
					</Grid>
				</Grid>
			</Card>
			<Container>
		
			</Container>
		</Container></>
			
	)
}

export default FrontPage