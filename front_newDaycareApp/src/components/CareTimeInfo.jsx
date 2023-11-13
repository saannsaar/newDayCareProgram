import {   Dialog, TextField, Grid, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteSpesificCaretime, modifyCaretime } from '../reducers/CaretimeReducer'


// eslint-disable-next-line react/prop-types
const CareTimeInfo = ({ pickedCareTimes, childId }) => {

	const [inDayCare, setInDayCare] = useState('No')

	const dispatch = useDispatch()
	const pickeddateString = moment(pickedCareTimes[0].start_time).format('MMM Do YY')
	const startTime = moment(pickedCareTimes[0].start_time).format('HH:mm')
	const endTime = moment(pickedCareTimes[0].end_time).format('HH:mm')
	const [start_time, setStartTime] = useState(moment(new Date(pickedCareTimes[0].start_time)))
	const [end_time, setEndTime] = useState(moment(new Date(pickedCareTimes[0].end_time)))

	

	useEffect(() => {
		
		if (moment(moment(), 'YYYY-MM-DD h:mm').isBetween(moment(start_time, 'YYYY-MM-DD h:mm'), moment(end_time, 'YYYY-MM-DD h:mm')) == true) {
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
		}
	}

	const handleEditCaretime = (e) => {
		e.preventDefault()

		const content = {
			start_time: moment(start_time).format(),
			end_time: moment(end_time).format(),
			kid_name: pickedCareTimes[0].kid_name,
			_id: pickedCareTimes[0]._id
		}
		
		dispatch(modifyCaretime(content, childId))

		setmodalOpen(false)
		
	}

	const handleDeleteCaretime = () => {
		
		const content = {
			_id: pickedCareTimes[0]._id
		}
		dispatch(deleteSpesificCaretime(content, childId))
		setmodalOpen(false)
	}
	
	return (
		<><Item  style={{margin:'10px', backgroundColor: defineColor()}} onClick={() => handleModalOpen()}>
			{startTime} - {endTime}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{pickedCareTimes[0].kid_name}</DialogTitle>
			<Divider />
			<DialogContent>
				<div style={{margin: '10px'}}>
					<form onSubmit={handleEditCaretime}>
						<TextField label="Date"  fullWidth value={pickeddateString}/>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div style={{marginTop: '10px'}}>
								<TimePicker label="Daycare starts"
									
									value={start_time}
									onChange={(newValue) => setStartTime(newValue)}/>
								<TimePicker
									label="Daycare ends"
									
									value={end_time}
									onChange={(newValue) => setEndTime(newValue)}
								/>
							</div>
							
						</LocalizationProvider>
						<Grid style={{marginTop: '10px'}} >
							<Grid item>
								<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
									onClick={() => handleModalClose()}> 
                                            Peruuta 
								</Button>
							</Grid>
							<Grid item>
								<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
									onClick={() => handleDeleteCaretime()}> 
                                            Poista hoitoaika 
								</Button>
							</Grid>
							<Grid item >
								<Button style={{ float: 'right', }} type="submit" variant="contained"> Tallenna muutokset
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