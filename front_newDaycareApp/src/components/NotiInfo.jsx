import {   Dialog, Button, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { useDispatch } from 'react-redux'

import { useState } from 'react'
import { deleteNotification } from '../reducers/NotificationReducer'


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
		<><Item  style={{backgroundColor: noti.colorCode ? noti.colorCode : '#FFFFFF', margin: '4px'}} onClick={() => handleModalOpen()}>
			{noti.headingtext}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle  style={{backgroundColor:  noti.colorCode ? noti.colorCode : '#FFFFFF'}}>{noti.headingtext}</DialogTitle>
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