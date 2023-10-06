/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Grid, Button, Divider, TextField } from '@mui/material'
import Item from './Item'
import { useState } from 'react'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createCaretime } from '../reducers/CaretimeReducer'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import dayjs from 'dayjs'

// Element which renders an form where the user can add 
// new caretimes for their child 

// eslint-disable-next-line react/prop-types
const AddCareTime = ({ kid, pickedChildId, pickedDay }) => {
	moment.locale('utc')
	const yy = new Date(pickedDay).getFullYear()
	const mm = new Date(pickedDay).getMonth()
	const dd = new Date(pickedDay).getDate()
	const pickeddateString = moment(pickedDay).format('MMM Do YY')
	//console.log(moment(new Date(yy, mm, dd, 7, 20)).format())
	// const adapter = new AdapterDayjs()
	const[start_time, setStartTime] = useState(moment(new Date(yy, mm, dd, 7, 20)))
	const[end_time, setEndTime] = useState(moment(new Date(yy, mm, dd, 17, 20)))
	const [modalOpen, setmodalOpen] = useState(false)
	// console.log(new Date(pickedDay).getFullYear())
	// console.log(start_time)
	// console.log(kid)
	console.log(dayjs(moment(new Date(yy, mm, dd, 7, 20)).format()))
	const dispatch = useDispatch()
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	const handleAddCaretime = (e) => {
		e.preventDefault()
		const child_id = pickedChildId
		
		// console.log(child_id)
		console.log({start_time: moment(start_time).format(),end_time: moment(end_time).format(), child_id })
		dispatch(createCaretime({start_time: moment(start_time).format(), end_time: moment(end_time).format(), child_id}))
		setmodalOpen(false)
	}
	
	return (
		<><Item  onClick={() => handleModalOpen()}>
			Lisää hoitoaika
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{kid}</DialogTitle>
			<Divider />
			<DialogContent>
				<div>
					<form onSubmit={handleAddCaretime}>
						<TextField label="Date" fullWidth value={pickeddateString}/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label="Daycare starts"
								value={start_time}
								onChange={(newValue) => setStartTime(newValue)}
							/>
							<DateTimePicker
								label="Daycare ends"
								value={end_time}
								onChange={(newValue) => setEndTime(newValue)}
							/>
						</LocalizationProvider>
						<Grid>
							<Grid item>
								<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
									onClick={() => handleModalClose()}> 
                                                Cancel 
								</Button>
							</Grid>
							<Grid item>
								<Button style={{ float: 'right', }} type="submit" variant="contained"> Add caretime
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
			</DialogContent>
		</Dialog></>
	)
}

export default AddCareTime