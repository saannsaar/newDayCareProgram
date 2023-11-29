import {List,  Grid, Divider, TextField, Fab, Typography } from '@mui/material'
import SingleMessage from './SingleMessage'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendNewMessage } from '../reducers/MessageReducer'


const ConversationArea = ({ messages, receiver, currentUser }) => {

	if (!messages || !receiver || !currentUser) {
		return (
			<Typography style={{ padding: '10px'}}>Valitse keskustelu! </Typography>
		)
	} else {
		const dispatch = useDispatch()
		const [content, setMessageContent] = useState('')
	
		const handleSendMessage = () => {
			
			const message ={
				content: content,
				receiver: receiver
			}
			dispatch(sendNewMessage(message))
			setMessageContent('')
	
	
		}
		return (
			<Grid item xs={9}>
				<Typography sx={{padding: '6px', backgroundColor: '#89b0a0'}}>{receiver}</Typography>
				<Divider />
				<List style={{ height:'42vh' , overflowY: 'auto' }}>
					
	
					{messages?.map((m, index) => 
						(<SingleMessage key={index}message={m} index={index} currentUserID={currentUser.id}/>)
					)} </List>
				<Divider />
				<Grid container style={{padding: '20px'}}>
					<Grid item xs={11}>
						<TextField sx={{width:'97%'}} value={content} onChange={({ target }) => setMessageContent(target.value)} label='Kirjoita viesti'/>
					</Grid>
						
					<Grid item xs={1}>
						<Fab color='primary' type='button' onClick={handleSendMessage}><SendIcon></SendIcon> </Fab>
					</Grid>
				</Grid>
			</Grid>
		)
	}
	
}

export default ConversationArea