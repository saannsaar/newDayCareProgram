/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const AddCareTime = ({ kid }) => {

	const [modalOpen, setmodalOpen] = useState(false)
	const handleModalOpen = () => {
		setmodalOpen(true)
	}

	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	
	return (
		<><Item  onClick={() => handleModalOpen()}>
			{kid.name}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{kid.name}</DialogTitle>
			<Divider />
			<DialogContent>
				
				<Item>
					{kid.name}
				</Item>
				<Item>
					{kid.name}
				</Item>
			</DialogContent>
		</Dialog></>
	)
}

export default AddCareTime