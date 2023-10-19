/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'

import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const NotiInfo = ({ noti, usertype }) => {

	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	if (usertype == 'parent_user') {
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
					<Item>
                    Moi
					</Item>
				</DialogContent>
			</Dialog></> 
		)
	} else {
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
					<Item>
						Moi
					</Item>
				</DialogContent>
			</Dialog></>
		)
	}
	
}

export default NotiInfo