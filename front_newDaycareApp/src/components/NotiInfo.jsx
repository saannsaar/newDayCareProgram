/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { useDispatch } from 'react-redux'

import { useState } from 'react'
import { deleteNotification } from '../reducers/NotificationReducer'

// eslint-disable-next-line react/prop-types
const NotiInfo = ({ noti, usertype }) => {
	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}
	const handleModalClose = () => {
		setmodalOpen(false)
	}
	const dispatch = useDispatch()
	const handleDeleteNoti = () => {
		dispatch(deleteNotification(noti.id))
		setmodalOpen(false)
	}
	

	return (
		<><Item  style={{backgroundColor: '#fca4b4'}} onClick={() => handleModalOpen()}>
			{noti.headingtext}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle  style={{backgroundColor: '#fca4b4'}}>{noti.headingtext}</DialogTitle>
			<Divider />
			<DialogContent>
				<Item>
					{noti.contenttext}
				</Item>
				{usertype == 'worker_user' ? <Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
					onClick={() => handleDeleteNoti()}> 
                                                Poista ilmoitus 
				</Button> : null }
			</DialogContent>
		</Dialog>
        
	
		</> 
	)
	
		
	
}

export default NotiInfo