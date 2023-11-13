import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeConversation } from '../reducers/ConversationsReducer'
import { initializeMessages, sendNewMessage } from '../reducers/MessageReducer'
import { Button, DialogTitle,DialogContent, Dialog, TextField, Divider, Grid, List, ListItem, ListItemText, Paper, Select, Typography } from '@mui/material'
import ConversationArea from './ConversationArea'


const Messages = ({usertype, currentUser }) => {
	const [modalOpen, setmodalOpen] = useState(false)
	const [content, setContent] = useState('')
	
	const handleModalOpen = () => {
		setmodalOpen(true)
	}
	const handleModalClose = () => {
		setmodalOpen(false)
	}
	
	
	const [selectedPerson, setSeleectedPerson] = useState('')
	const handleChangeConversation = (c) => {
		console.log(c.id)
		setSeleectedPerson(c.name)
		dispatch(initializeMessages(c.id))

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
	const [filterConversations, setFilterConversation] = useState(conversations)
	
	const sendToAll = (e) => {
		e.preventDefault()
		
		conversations.map((c) => dispatch(sendNewMessage({content, receiver: c.name})))
		setmodalOpen(false)
	}

	const handleFilter = (e) => {
		const filtersearch = conversations.filter((c) => {
			return c.name.toLowerCase().includes(e.target.value.toLowerCase())
		})
		setFilterConversation(filtersearch)
		
	}
	return (
		<div>

			
			<Typography variant='h3'>Viestit</Typography>
			<Grid container component={Paper} style={{margin: '10px', width: '98%', height: '64vh'}}>
				<Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0'}}>
					 <Grid item xs={12} style={{padding: '10px'}}>
						<TextField onChange={handleFilter}  label="Hae" variant="outlined" fullWidth />
						{ usertype == 'worker_user' ? <><Button onClick={() => handleModalOpen()}>Lähetä viesti kaikille vanhemmille</Button>
							<Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
								<DialogTitle > Lähetä viesti kaikille vanhemmille </DialogTitle>
								<Divider />
								<DialogContent>
									<form onSubmit={sendToAll}>
										<TextField
											label="Viestin sisältö: "
											fullWidth
											value={content}
											onChange={({ target }) => setContent(target.value)} />
										<Grid>
											<Grid item>
												<Button color="secondary" variant="contained" style={{ float: 'left' }} type="button"
													onClick={() => handleModalClose()}>
														Peruuta
												</Button>
											</Grid>
											<Grid item>
												<Button style={{ float: 'right', }} type="submit" variant="contained"> Lähetä
												</Button>
											</Grid>
										</Grid>
									</form>
								</DialogContent>
							</Dialog></>
							: null }
						
					</Grid>
					<List style={{overflowY: 'auto', height: '41vh'}}>
						{filterConversations.map((c) => {
							return (
								<><ListItem key={c.name}>
									<ListItemText  sx={[
										{
											'&:hover': {
												color: '#a7c4ad',
												backgroundColor: 'white',
											},
										},
									]} onClick={() => handleChangeConversation(c)} primary={c.name} ></ListItemText>
								</ListItem><Divider /></>

							)
						})}
					</List>
					

				</Grid>

				
					
				
				<ConversationArea receiver={selectedPerson} messages={conversation} currentUser={currentUser}/> 
			</Grid>
				
			
		
		</div>
	)

}

export default Messages