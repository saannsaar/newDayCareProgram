/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeConversation } from '../reducers/ConversationsReducer'
import { initializeMessages } from '../reducers/MessageReducer'
import { Button, Container, Grid, List, ListItem, ListItemText, Paper, Select, Typography } from '@mui/material'
import Item from './Item'
import { FormControl } from '@mui/base'
import ConversationArea from './ConversationArea'
import CreateNewConversation from './CreateNewConversation'

const Messages = ({usertype, currentUser }) => {

	
	console.log('HEI')
	console.log(currentUser)
	
	const [selectedPerson, setSeleectedPerson] = useState('')
	console.log(selectedPerson)
	const handleChangeConversation = (id) => {
		console.log(id)
		setSeleectedPerson(id)
		dispatch(initializeMessages(id))

	}
	const dispatch = useDispatch()
	
	const conversations = useSelector(state => state.conversations)
	const conversation = useSelector(state => state.messages)
	useEffect(() => {
		dispatch(initializeConversation(usertype))
		dispatch(initializeMessages(conversations[0].id))
		
		
	}, [])

	
	if (!conversations || !currentUser) {
		return (
			<div>Loading</div>
		)
	}
	console.log(conversations)
	console.log(conversation)

	
	return (
		<div>

			
			<Typography variant='h3'>Viestit</Typography>
			<Grid container component={Paper} style={{margin: '10px', width: '98%', height: '64vh'}}>
				<Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0'}}>
					<List>
						{conversations.map((c) => {
							return (
								<ListItem>
									<ListItemText onClick={() => handleChangeConversation(c.id)} primary={c.name}></ListItemText>
								</ListItem>

							)
						})}
					</List>
					

				</Grid>

				
					
				{conversation && conversation.length > 0 ? 
					<ConversationArea messages={conversation} currentUser={currentUser}/> : null }
			</Grid>
				
			
		
		</div>
	)

}

export default Messages