
import {   Dialog, DialogContent, DialogTitle, Grid, Button, Divider, TextField } from '@mui/material'
import Item from './Item'
import { useState } from 'react'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useDispatch} from 'react-redux'
import moment from 'moment'
import { createCaretime } from '../reducers/CaretimeReducer'
import { initializeCurrentChild } from '../reducers/CurrentChild'

// Element which renders an form where the user can add 
// new caretimes for their child 


const AddCareTime = ({ kid, pickedChildId, pickedDay }) => {
	moment.locale('fin')
	
	const yy = new Date(pickedDay).getFullYear()
	const mm = new Date(pickedDay).getMonth()
	const dd = new Date(pickedDay).getDate()
	const pickeddateString = moment(new Date(pickedDay)).format('MMM Do YY')

	const[start_time, setStartTime] = useState(moment(new Date(yy, mm, dd, 5, 45)))
	const[end_time, setEndTime] = useState(moment(new Date(yy, mm, dd, 17, 0)))
	const [modalOpen, setmodalOpen] = useState(false)

	
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
		

		dispatch(createCaretime({start_time: moment(new Date(start_time)).format(), end_time: moment(new Date(end_time)).format()}, child_id))
		dispatch(initializeCurrentChild(kid))
		setmodalOpen(false)
	}
	

	return (
		<><Item  onClick={() => handleModalOpen()}  style={{margin: '10px'}}>
			Lisää hoitoaika
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{kid.name}</DialogTitle>
			<Divider />
			<DialogContent>
				<div>
					<form onSubmit={handleAddCaretime}>
						<TextField label="Date" fullWidth value={pickeddateString}/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<TimePicker label="Daycare starts"
								value={start_time}
								onChange={(newValue) => setStartTime(newValue)}/>
							<TimePicker
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