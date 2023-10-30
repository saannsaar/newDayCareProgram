/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, TextField, Grid, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import moment from 'moment'


// eslint-disable-next-line react/prop-types
const CareTimeInfo = ({ pickedCareTimes }) => {


	const [inDayCare, setInDayCare] = useState('No')

	console.log(pickedCareTimes)
	console.log(pickedCareTimes[0].start_time)
	console.log(pickedCareTimes[0].end_time)
	const pickeddateString = moment(pickedCareTimes[0].start_time).format('MMM Do YY')
	
	console.log(moment(pickedCareTimes.start_time).format('yyyy-MM-DD HH:mm'))

	const startTime = moment(pickedCareTimes[0].start_time).format('HH:mm')
	const endTime = moment(pickedCareTimes[0].end_time).format('HH:mm')
	const currentTime = moment(moment().format('HH:mm'))
	const [start_time, setStartTime] = useState(pickedCareTimes[0].start_time)
	const [end_time, setEndTime] = useState(pickedCareTimes[0].end_time)
	console.log('Current time', currentTime._i)
	console.log(startTime, endTime)
	console.log(moment(currentTime._i).isBetween(pickedCareTimes.start_time, pickedCareTimes.end_time))

	useEffect(() => {

		if (moment(currentTime).isBetween(startTime, endTime) == true) {
			setInDayCare('Yes')
		} else {
			setInDayCare('No')
		}
	}, [])

	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	const defineColor = () => {
		switch (inDayCare) {
		case 'Yes':
			return '#bbf0d0'
		case 'No':
			return '#d4a5ac'
		case 'Soon Home':
			return '#e0cc9d'
		}
	}
	const handleEditCaretime = () => {
		console.log('edit')
		console.log({start_time, end_time})
	}
	
	return (
		<><Item  style={{backgroundColor: defineColor()}} onClick={() => handleModalOpen()}>
			{startTime} - {endTime}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{pickedCareTimes[0].kid_name}</DialogTitle>
			<Divider />
			<DialogContent>
				<div>
					<form onSubmit={handleEditCaretime}>
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

export default CareTimeInfo