/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {   Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Item from './Item'
import { useEffect, useState } from 'react'
import moment from 'moment'


// eslint-disable-next-line react/prop-types
const CareTimeInfo = ({ pickedCareTimes }) => {


	const [inDayCare, setInDayCare] = useState('No')

	console.log(pickedCareTimes.start_time)
	console.log( moment('2010-10-19 09:00').isBetween('2010-10-19 07:00', '2010-10-19 15:00'))
	console.log(moment(pickedCareTimes.start_time, 'HH:mm').format('yyyy-MM-DD HH:mm'))

	const startTime = moment(pickedCareTimes.start_time, 'HH:mm').format('yyyy-MM-DD HH:mm')
	const endTime = moment(pickedCareTimes.end_time, 'HH:mm').format('yyyy-MM-DD HH:mm')
	const currentTime = moment(moment().format('yyyy-MM-DD HH:mm'))
	
	console.log('Current time', currentTime)
	console.log(moment(currentTime).isBetween(startTime, endTime))

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
	
	return (
		<><Item  style={{backgroundColor: defineColor()}} onClick={() => handleModalOpen()}>
			{pickedCareTimes.start_time} - {pickedCareTimes.end_time}
		</Item>
		<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
			<DialogTitle >{pickedCareTimes.kid_name}</DialogTitle>
			<Divider />
			<DialogContent>
				
			
			</DialogContent>
		</Dialog></>
	)
}

export default CareTimeInfo