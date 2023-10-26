/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable for-direction */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
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
// eslint-disable-next-line no-unused-vars
import dayjs, { Dayjs } from 'dayjs'
import { createEvent } from '../reducers/EventReducer'




const FrontPage = ({ events, kids, usertype, notifications, weather }) => {
	const [modalOpen, setmodalOpen] = useState(false)
	const [emodalOpen, setemodalOpen] = useState(false)
	
	
	const dispatch = useDispatch()
	if(!events || !notifications || !weather) {
		return (
			<div>
					Loading....
			</div>
		)
	} else if(!kids && usertype == 'parent_user') {
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
		const firstAvailableDay = adapter.date(new Date(2023, 9, 9))
		const [calendarValue, setCalendarValue] = useState(firstAvailableDay)
		const [pickedEvents, setPickedEvents] = useState([])
	
		const [headingtext, setHeadingtext] = useState('')
		const [contenttext, setContenttext] = useState('')
		const [toParents, setToparents] = useState(true)
		const [name, setName] = useState('')
		const [date, setDate] = useState(dayjs('2023-10-24T07:30'))
		const [event_type, setEventType] = useState('W_event')
		const [info, setInfo] = useState('')
		const [group, setGroup] = useState('')
		

		
		
		console.log('PARENT FRONTPAGE')
		moment.locale('fin')
		// console.log(kids)
		// console.log(notifications)

			
		// console.log(calendarValue.$d)
			
		// console.log(moment(events[0].date).format('MMM Do YY'))
		// console.log(moment(calendarValue.$d).format('MMM Do YY'))
			
			
		const childGroup = kids.group
		// console.log(childGroup)
		// console.log(events)
		
		const handleDayPick = (event) => {
			console.log(event)
			setCalendarValue(event)
			if (usertype == 'parent_user') {
				const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(event.$d).format('MMM Do YY') && e.group.toString().includes(childGroup))
				console.log(find_events)
				setPickedEvents(find_events)
				setDate(event)
			} else {
				const find_events = events.filter((e) => moment(e.date).format('MMM Do YY') === moment(event.$d).format('MMM Do YY'))
				console.log(find_events)
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

			console.log({headingtext, contenttext, toParents})
			dispatch(createNotification({headingtext, contenttext, toParents}))
			setmodalOpen(false)
		}
		const handleAddEvent = (e) => {
			e.preventDefault()

			console.log({name, date, event_type, info, group})
			dispatch(createEvent({name, date: date.$d, event_type, info, group}))
			setemodalOpen(false)
		}

		const handleCheckParents = (event) => {
			setToparents(event.target.checked)
		}
		console.log(toParents)
		return (
			<>
		
		
				<Grid container spacing={3} style={{marginTop: '20px', marginLeft: '5px'}}>
					<Grid style={{ margin: '10px'}}>
						 <Item>
						 <Typography variant="h6" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
								Ilmoitukset
							</Typography>
						 {notifications.map(n => 
								<NotiInfo key={n.headingtext} noti={n} usertype={usertype} />)}
							{usertype == 'worker_user' ? <><Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
								<DialogTitle>Lisää ilmoitus</DialogTitle>
								<Divider />
								<DialogContent>
									<div>
										<form onSubmit={handleAddNoti}>
											<TextField
												label="Ilmoituksen otsikko: "
												fullWidth
												value={headingtext}
												onChange={({ target }) => setHeadingtext(target.value)} />
											<TextField
												label="Ilmoituksen sisältö: "
												fullWidth
												value={contenttext}
												onChange={({ target }) => setContenttext(target.value)} />
											<Checkbox 
												checked={toParents}
												onChange={handleCheckParents}
												inputProps={{ 'aria-label': 'controlled'}}/>
												
											
											
											<Grid>
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
										</form>
									</div>
								</DialogContent>
							</Dialog><Button onClick={handleModalOpen}>Lisää ilmoitus</Button></> : null}
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
													<TextField
														label="Ryhmä: "
														fullWidth
														value={group}
														onChange={({ target }) => setGroup(target.value)} />
											
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
					</Grid>
					<Item>
						<Typography variant="h6" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
								Sää tänään {weather.name}ssa
						</Typography>
						<img style={{width: '50px'}} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /><br/>
						<Typography variant="p" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
							Lämpötila: {weather.main.temp} astetta
						</Typography> <br/>
						<Typography variant="p" style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>
							Tuuli: {weather.wind.speed} m/s
						</Typography><br/>
							
					</Item>
				</Grid>
		
			</>			
		)
	}
	

		
}

export default FrontPage