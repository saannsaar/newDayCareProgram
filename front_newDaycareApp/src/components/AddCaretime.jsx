
import {   Dialog, DialogContent, DialogTitle, Grid, Button, Divider, TextField } from '@mui/material'
import Item from './Item'

import { useEffect, useState } from 'react'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useDispatch} from 'react-redux'
import moment from 'moment'
import { createCaretime } from '../reducers/CaretimeReducer'
import { initializeCurrentChild } from '../reducers/CurrentChild'

// Element which renders an form where the user can add 
// new caretimes for their child 
const AddCareTime = ({ kid, pickedChildId, pickedDay, changed, setChanged}) => {
	moment.locale('fin')
	console.log(pickedDay)

	const[start_time, setStartTime] = useState(moment(pickedDay))
	const[end_time, setEndTime] = useState(moment(pickedDay))

	const pickeddateString = moment(pickedDay).format('MMM Do YY')

	
	const [modalOpen, setmodalOpen] = useState(false)

	
	useEffect(() => {
		setStartTime(moment(pickedDay))
		setEndTime(moment(pickedDay))
	}, [pickedDay])


	const dispatch = useDispatch()
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	const handlestartChange = (newValue) => {
		console.log(newValue)
		setStartTime(newValue)
	}
	const handleendChange = (newValue) => {
		console.log(newValue)
		setEndTime(newValue)
	}
	
	const handleAddCaretime = async (e) => {
		e.preventDefault()
		const child_id = pickedChildId
		await dispatch(createCaretime({start_time: moment(start_time).format(), end_time: moment(end_time).format()}, child_id))
		await dispatch(initializeCurrentChild(kid))
		setmodalOpen(false)
		console.log(changed, !changed)
		setChanged(!changed)
		
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
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<TimePicker label="Daycare starts"
								value={start_time}
								onChange={(newValue) => handlestartChange(newValue)}/>
							<TimePicker
								label="Daycare ends"
								value={end_time}
								onChange={(newValue) => handleendChange(newValue)}
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