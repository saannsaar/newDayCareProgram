/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import moment from 'moment'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const EventInfo = ({ event }) => {

	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	const defineColor = () => {
		switch (event.event_type) {
		case 'W_event':
			return '#d4af66'
		case 'C_event':
			return '#b29adb'
		case 'P_event':
			return '#b6c47e'
		}
	}
	
	return (
		<><Item style={{backgroundColor: defineColor()}} onClick={() => handleModalOpen()}>
			{event.name}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle style={{backgroundColor: defineColor()}}>{event.name}</DialogTitle>
			<Divider />
			<DialogContent>
				<Item>
					{moment(event.date).format('MMM Do YY')}
				</Item>
				<Item>
					{event.info}
				</Item>
				<Item>
					{event.group.name}
				</Item>
			</DialogContent>
		</Dialog></>
	)
}

export default EventInfo