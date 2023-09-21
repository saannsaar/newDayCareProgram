/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import Item from './Item'
import { useState } from 'react'
import { TimePicker } from '@mui/x-date-pickers'

// Element which renders an form where the user can add 
// new caretimes for their child 

// eslint-disable-next-line react/prop-types
const AddCareTime = ({ kid, pickedDay }) => {

	const[start_time, setStartTime] = useState()
	const[end_time, setEndTime] = useState()
	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	
	return (
		<><Item  onClick={() => handleModalOpen()}>
			Lisää hoitoaika
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{kid.name}</DialogTitle>
			<Divider />
			<DialogContent>
				<div>
					<form >
						<TextField>{pickedDay}</TextField>
						<TimePicker label="Controlled picker"
							value={start_time}
							onChange={(newValue) => setStartTime(newValue)}/>
						<TimePicker label="Controlled picker"
							value={end_time}
							onChange={(newValue) => setEndTime(newValue)}/>
					</form>
				</div>
			</DialogContent>
		</Dialog></>
	)
}

export default AddCareTime