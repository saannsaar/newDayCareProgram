import {  useState } from 'react'
import { DateCalendar, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'
import { Button, Typography, Grid, MenuItem,  Dialog, DialogTitle, Divider, TextField, DialogContent, Checkbox,  Select} from '@mui/material'
import Item from './Item'
import moment from 'moment'
import EventInfo from './EventInfo'
import { createNotification } from '../reducers/NotificationReducer'
import { useDispatch } from 'react-redux'
import NotiInfo from './NotiInfo'
import dayjs from 'dayjs'
import { createEvent } from '../reducers/EventReducer'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import Air from '@mui/icons-material/Air'

// This is a component which renders the frontpage of the application and there is a bit different
// funcionalities depending on wether the logged in user is a parent or a worker. For example
// a parent user can't add new events and they also can't see those events that have a "W_event" value
// on "event_type" key. Worker user can add events and notifications and they can define if the events are for workers, children 
// or parents. Events are linked to a specific date. Notifications are just on the board and can be added or deleted. 
const FrontPage = ({ events, kids, usertype, notifications, weather , groups}) => {
	const [modalOpen, setmodalOpen] = useState(false)
	const [emodalOpen, setemodalOpen] = useState(false)
	
	const dispatch = useDispatch()

	if(!events || !notifications || !weather || !groups) {
		return (
			<div>
					Loading....
			</div>
		)
	} else if(!kids && usertype == 'parent_user') {
		console.log(kids)
		return(
			<div>
				Valitse lapsi!
			</div>
		)
	} else if (!kids && usertype == 'worker_user') {
		return (
			<div>
					Loading....
			</div>
		)
	} else {

		const adapter = new AdapterDayjs()
		const firstAvailableDay = adapter.date(new Date())
		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
	
		const [headingtext, setHeadingtext] = useState('')
		const [contenttext, setContenttext] = useState('')
		const [toParents, setToparents] = useState(true)
		const [colorCode, setColorCode] = useState('#5e8072')
		const [name, setName] = useState('')
		const [date, setDate] = useState(dayjs('2023-10-24T07:30'))
		const [event_type, setEventType] = useState('W_event')
		const [info, setInfo] = useState('')
		const [group, setGroup] = useState(groups[0]?.name)

		const handleColorChange = (newValue) => {
			setColorCode(newValue.target.value)
		}


		moment.locale('fin')
	
		const handleDayPick = (event) => {

			setCalendarValue(event)
			if (usertype == 'parent_user') {
				console.log(events)
				const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(event.$d).format('MMM Do YY') && e.event_type !== 'W_event')
				setPickedEvents(find_events)
				setDate(event)
			} else {
				const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(event.$d).format('MMM Do YY'))
				setPickedEvents(find_events)
				setDate(event)
			}
			
		}

		const handleModalOpen = () => {
			setmodalOpen(true)
		}
		const handleModalClose = () => {
			setmodalOpen(false)
		}

		const handleEModalOpen = () => {
			setemodalOpen(true)
		}
		const handleEModalClose = () => {
			setemodalOpen(false)
		}
	
		const handleAddNoti = (e) => {
			e.preventDefault()

			dispatch(createNotification({headingtext, contenttext, toParents, colorCode}))
			setHeadingtext('')
			setContenttext('')
			setToparents(true)
			setColorCode('#5e8072')

			setmodalOpen(false)
		}
		const handleAddEvent = (e) => {
			e.preventDefault()

			dispatch(createEvent({name, date: date.$d, event_type, info, group}))
			setemodalOpen(false)
		}

		const handleCheckParents = (event) => {
			setToparents(event.target.checked)
		}

		return (
			<>
		
		
				<Grid rowSpacing={2}container alignItems='stretch' justifyContent='center' spacing={3} style={{marginTop: '20px', marginLeft: '5px'}}>
				
					<Item >
						<Typography variant="h6" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
								Ilmoitukset
						</Typography>
						{notifications.map(n => 
							<NotiInfo key={n.headingtext} noti={n} usertype={usertype} />)}
						{usertype == 'worker_user' ? <><Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
							<DialogTitle style={{backgroundColor: colorCode}}>Lisää ilmoitus</DialogTitle>
							<Divider />
							<DialogContent>
								<div>
									<form onSubmit={handleAddNoti}>
										<TextField style={{margin: '4px'}}
											label="Ilmoituksen otsikko: "
											fullWidth
											value={headingtext}
												
											onChange={({ target }) => setHeadingtext(target.value)} />
										<TextField
											label="Ilmoituksen sisältö: "
											style={{margin: '4px'}}
											fullWidth
											value={contenttext}
											onChange={({ target }) => setContenttext(target.value)} />
											
										<Grid container direction='column'>
											<Grid item > 
												<Grid container direction='row' alignItems="stretch" marginBottom='20px'>
													<Grid item >
														<Typography  style={{  marginLeft: '4px', marginTop: '6px' }}>Näytä vanhemmille: </Typography>
														<Checkbox 
												
															checked={toParents}
															size='medium'
															onChange={handleCheckParents}
															inputProps={{ 'aria-label': 'controlled'}}/> </Grid>

												</Grid>
												<Grid item xs={4} >
														
													<Typography  style={{  marginLeft: '4px', marginTop: '6px' }}> Valitse ilmoituksen väri:</Typography>
													<input id='colorpickerinput' type='color' value={colorCode} style={{marginLeft: '4px', marginTop:'10px'}} onChange={handleColorChange}/>
														
												</Grid>
											</Grid>
												
											
												
											
											<Grid item>
												<Grid item>
													<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
														onClick={() => handleModalClose()}>
														Peruuta
													</Button>
												</Grid>
												<Grid item>
													<Button style={{ float: 'right', }} type="submit" variant="contained"> Tallenna
													</Button>
												</Grid>
											</Grid>
										</Grid>
											
									</form>
								</div>
							</DialogContent>
						</Dialog><Button onClick={handleModalOpen}>Lisää ilmoitus</Button></> : null}
					</Item>
					

					
					<Item style={{marginLeft: '15px'}}>
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
								{pickedEvents?.length > 0 ? pickedEvents.map((e) => <EventInfo key={e.id.concat(e.name)} usertype={usertype} event={e}/>) : <Item>Ei tapahtumia</Item>}
								{usertype == 'worker_user' ? <><Dialog fullWidth={true} open={emodalOpen} onClose={() => handleEModalClose()}>
									<DialogTitle>Lisää tapahtuma</DialogTitle>
									<Divider />
									<DialogContent>
										<div>
											<form onSubmit={handleAddEvent}>
												<TextField
													label="Tapahtuman nimi: "
													fullWidth
													value={name}
													onChange={({ target }) => setName(target.value)} />
										
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DateTimePicker label='Päivämäärä: ' value={date} onChange={(newValue) => setDate(newValue)}/>
												</LocalizationProvider>

												<Select value={event_type} onChange={({ target }) => setEventType(target.value)}>
													<MenuItem value='W_event'>Työntekijät</MenuItem>
													<MenuItem value='P_event'>Vanhemmat</MenuItem>
													<MenuItem value='C_event'>Lapset</MenuItem>
												</Select>
												<TextField
													label="Tapahtuman sisältö: "
													fullWidth
													value={info}
													onChange={({ target }) => setInfo(target.value)} />
												<Select value={group} onChange={({ target }) => setGroup(target.value)}>
													{groups.map((g) => (
														<MenuItem key={g.id} value={g.name}>{g.name}</MenuItem>
													))}
												</Select>
											
												<Grid>
													<Grid item>
														<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
															onClick={() => handleEModalClose()}>
														Peruuta
														</Button>
													</Grid>
													<Grid item>
														<Button style={{ float: 'right', }} type="submit" variant="contained"> Tallenna
														</Button>
													</Grid>
												</Grid>
											</form>
										</div>
									</DialogContent>
								</Dialog><Button onClick={handleEModalOpen}>Lisää ilmoitus</Button></> : null}
							</Grid>
						</Grid>
					</Item>
					

					<Item style={{marginLeft: '15px', width:'25%'}}>
						<Grid container spacing={1} rowSpacing={1}>
							<Grid item xs={8}>
								<Typography style={{paddingTop: '5px'}}variant='h5'>{weather.name}</Typography>
							</Grid>
							<Grid item xs={4}>
								<img style={{width: '50px'}} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
							</Grid>
							<Grid item xs={12}>
								<Divider> Sää tänään</Divider>
							</Grid>
							<Grid item xs={4} >
								<Item>
									<ArrowUpward></ArrowUpward>
									<Typography>{weather.main.temp_max} °C</Typography></Item>
							</Grid>
						
							<Grid item xs={4}  >
								<Item>
									<ArrowDownward></ArrowDownward>
									<Typography>{weather.main.temp_min} °C</Typography></Item>
							</Grid>
							<Grid item xs={4}  >
								<Item>
									<Air></Air>
									<Typography>{weather.wind.speed} m/s</Typography></Item>
							</Grid>
						</Grid>
					</Item>

				</Grid>
		
			</>			
		)
	}
	

		
}

export default FrontPage