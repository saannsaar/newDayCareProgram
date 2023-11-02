/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ListItem, Grid, ListItemText } from '@mui/material'
import moment from 'moment'

const SingleMessage = ({message, index,  currentUserID}) => {


	console.log(message)

	console.log(moment(message.createdAt).format('DD.MM.YYYY HH:MM'))

	if(message.sender == currentUserID) {
		return (
			<ListItem  key={index+1} >
				<Grid container>
					<Grid item xs={8}></Grid>
					<Grid item xs={4} align="right">
						<ListItemText 
							
							align="right" 
							primaryTypographyProps={{fontSize: '14px'}} 
							primary={message.content}>
						</ListItemText></Grid>
                           
					<Grid item xs={12}>
						<ListItemText align="right" secondary={moment(message.createdAt).format('DD.MM.YYYY HH:MM')}>
						</ListItemText></Grid>
				</Grid>
				
    
			</ListItem>
		)
	}
	else if (message.receiver == currentUserID) {
		return (
			<ListItem  key={index+1}>
				<Grid container>
					<Grid item xs={4}>
						<ListItemText 
							primaryTypographyProps={{fontSize: '14px'}} 
							align="left" primary={message.content}>
						</ListItemText></Grid>

					<Grid item xs={12}>
						<ListItemText align="left" secondary={moment(message.createdAt).format('DD.MM.YYYY HH:MM')}>
						</ListItemText></Grid>
				</Grid>
            

			</ListItem>
		)
	}
   
}
export default SingleMessage