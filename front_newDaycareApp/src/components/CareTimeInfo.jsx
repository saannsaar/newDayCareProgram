/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const CareTimeInfo = ({ pickedCareTimes }) => {

	console.log(pickedCareTimes)
	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	// const defineColor = () => {
	// 	switch (pickedCareTimes.event_type) {
	// 	case 'W_event':
	// 		return '#d4af66'
	// 	case 'C_event':
	// 		return '#b29adb'
	// 	case 'P_event':
	// 		return '#b6c47e'
	// 	}
	// }
	
	return (
		<><Item onClick={() => handleModalOpen()}>
			{pickedCareTimes.date}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{pickedCareTimes.date}</DialogTitle>
			<Divider />
			<DialogContent>
				
			
			</DialogContent>
		</Dialog></>
	)
}

export default CareTimeInfo