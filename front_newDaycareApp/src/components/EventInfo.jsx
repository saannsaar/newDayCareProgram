import {   Dialog, DialogContent, DialogTitle, Divider, Button } from '@mui/material'
import Item from './Item'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../reducers/EventReducer'


const EventInfo = ({ event, usertype }) => {

	const [modalOpen, setmodalOpen] = useState(false)
	const dispatch = useDispatch()
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

	const handleDeleteEvent = () => {
		
		dispatch(deleteEvent(event.id))
		setmodalOpen(false)

	}
	
	return (
		<><Item style={{backgroundColor: defineColor(), margin:'10px'}} onClick={() => handleModalOpen()}>
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
{event.group ? <Item>
					{event.group.name}
				</Item> : null}
			</DialogContent>
			{usertype == 'worker_user' ? <Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
					onClick={() => handleDeleteEvent()}> 
                                                Poista tapahtuma 
				</Button> : null }
		</Dialog></>
	)
}

export default EventInfo