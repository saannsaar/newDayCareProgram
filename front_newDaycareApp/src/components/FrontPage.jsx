/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable for-direction */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {  useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Container, Button, Typography, Card, Grid } from '@mui/material'
import Item from './Item'
import moment from 'moment'
import EventInfo from './EventInfo'
import CareTimeInfo from './CareTimeInfo'
import axios from 'axios'


const FrontPage = ({ events, kids, currentUser, usertype, notifications }) => {


	const api_key = process.env.REACT_APP_WEATHER_API_KEY
	console.log(api_key)
	console.log(process.env)
	const lat = '62.24147'
	const lon = '25.72088'
	const [weather, setWeather] = useState({})
	useEffect(() => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
			.then((response) => {
				console.log('weather')
				setWeather(response.data)
			})
	},[])
	if (usertype == 'parent_user' && kids && weather) {

		console.log(weather)
		
		console.log('PARENT FRONTPAGE')
		moment.locale('fin')
		console.log(kids)
		console.log(notifications)

		if(!events || !weather) {
			return (
				<div>
					Loading..
				</div>
			)
		}
		// eslint-disable-next-line no-unused-vars
		console.log(kids)
		// eslint-disable-next-line no-unused-vars
		
		const adapter = new AdapterDayjs()
		const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
		
		console.log(calendarValue.$d)
		
		console.log(moment(events[0].date).format('MMM Do YY'))
		console.log(moment(calendarValue.$d).format('MMM Do YY'))
		
		
		const childGroup = kids[0].group
		console.log(childGroup)
		console.log(events)
		
		// TODO: Nyt näkyy vaan ensimmäisen lapsen tiedot, pitää toteuttaa
		// niin että kaikki lapset näkyvät

		// TEE HANDLE PICK!!!

		const handleDayPick = (event) => {
			console.log(event)
			setCalendarValue(event)
			const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(event.$d).format('MMM Do YY') && e.group.toString().includes(childGroup))
			console.log(find_events)
			setPickedEvents(find_events)
		}
		// useEffect(() => {
		// 	console.log(events)
		// 	console.log(calendarValue.$d)
		// 	const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(calendarValue.$d).format('MMM Do YY') && childGroup === e.group.id)
		// 	console.log(find_events)
		// 	setPickedEvents(find_events)
	
		// 	console.log(moment(calendarValue.$d).format('MMM Do YY'))
		// }, [calendarValue])
	
		console.log(pickedEvents)
		return (
			<>


				<Grid container spacing={3} style={{marginTop: '20px', marginLeft: '5px'}}>
					<Grid style={{ margin: '10px'}}>
			     <Item>
				 <Typography variant="h6" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
						Ilmoitukset
							</Typography>
				 {notifications.map(n => 
								<Item key={n.headingtext} style={{backgroundColor: '#edbed8'}}>{n.headingtext}</Item>)}
				 </Item>
					</Grid>
					<Grid style={{padding: '3px'}}> 
						<Item>
							<Grid container spacing={2} >
								<Grid item xs={8}>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DateCalendar value={calendarValue} onChange={(newValue) => handleDayPick(newValue)} />
									</LocalizationProvider>
								</Grid>
								<Grid item xs={4}>
									<Item>
										{moment(calendarValue.$d).format('MMM Do YY')}   
									</Item>
									{pickedEvents?.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id} event={e}/>) : <Item>Ei tapahtumia</Item>}
							
								</Grid>
							</Grid>
						</Item>
					</Grid>
					<Item>
						<Typography variant="h6" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
						Sää tänään {weather.name}ssa
						</Typography>
						<img style={{width: '50px'}} src={` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /><br/>
						<Typography variant="p" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
							{weather.main.temp} astetta
						</Typography> <br/>
						<Typography variant="p" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
							{weather.wind.speed} m/s
						</Typography><br/>
					
					

					</Item>
				</Grid>

				
			</>
				
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
				<Container style={{ marginBottom: '10px'}}>
					<Button>Lisää ilmoitus</Button>
			     <Card>
				 {notifications.map(n => 
							<Item key={n.headingtext} style={{backgroundColor: '#edbed8'}}>{n.headingtext}</Item>)}
				 </Card>
				</Container>
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