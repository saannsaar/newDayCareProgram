/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {List,  Grid } from '@mui/material'
import SingleMessage from './SingleMessage'

const ConversationArea = ({ messages, currentUser }) => {

	console.log(messages)
	console.log(currentUser)
	console.log(messages[0].sender, currentUser.id)
	return (
		<Grid xs={9}>
			<List style={{ margin: '10px' , overflowY: 'hidden' }}>
				

				{messages.map((m, index) => 
					(<SingleMessage key={index}message={m} index={index} currentUserID={currentUser.id}/>)
				)} </List>
		</Grid>
	)
}

export default ConversationArea