/* eslint-disable react/react-in-jsx-scope */
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Typography, Card, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import Item from './Item'

const FrontPage = () => {
	const this_worker = useSelector(state => state.currentUser)
	const [calendarValue, setCalendarValue] = useState(dayjs('2023-04-04'))
	
	useEffect(() => {
		console.log(calendarValue.$d)
	}, [calendarValue])

	return (
		<><Typography variant="h6" style={{ marginTop: '1em', marginBottom: '0.5em' }}>
			Tervetuloa NewDayCareAppiin {this_worker.name}
		</Typography><Container>
			<Card>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
							<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)} />
						</LocalizationProvider>
					</Grid>
					<Grid item xs={4}>
						<Item>{calendarValue}</Item>
					</Grid>
				</Grid>
			</Card>
			<Container>
		
			</Container>
		</Container></>
			
	)
}

export default FrontPage