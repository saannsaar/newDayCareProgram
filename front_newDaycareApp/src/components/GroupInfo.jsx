import { Typography, Dialog, DialogTitle, Divider, Button,  Grid } from '@mui/material'
import Item from './Item'
import { useState } from 'react'
import WorkerInfo from './WorkerInfo'

// This is a compnent to render one group's information. If the group item is clicked
// it opens a dialog where there are all the children listed who are in the group and the workers
// who's group it is. 
const GroupInfo = ({group }) => {

	if (group) {
		const [groupModalOpen, setGmodalOpen] = useState(false)	
		const handleGroupModalOpen = () => {
			setGmodalOpen(true)
			
		}
		const handleGroupModalClose = () => {
			setGmodalOpen(false)
		
		}
	
		const handleGroupSaveChanges = () => {
			handleGroupModalClose()
		}
		return (
			<><Item style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }} key={group.name} onClick={() => handleGroupModalOpen()}> {group.name} </Item><Dialog fullWidth={true} open={groupModalOpen} onClose={() => handleGroupModalClose()}>
				<DialogTitle style={{backgroundColor: '#d5c5fc'}}>{group.name}</DialogTitle>
				<Divider />
				<div style={{margin: '15px'}}>
					<Typography>Vastuussa: </Typography>
					{group.workers_in_charge.map((w, index) => <WorkerInfo key={index} worker={w} group={group}/>)}
					<form style={{marginBottom: '10px'}} onSubmit={handleGroupSaveChanges}>
						<Typography>Ryhmän lapset</Typography>
						{group.children.map((cc) => <Item key={cc.name.concat('select')}>{cc.name}</Item>)}
					</form>
					<Grid>
						<Grid item>
							<Button color="secondary" variant="contained" style={{ float: 'left',  backgroundColor: '#d5c5fc'}} type="button"
								onClick={() => handleGroupModalClose(group)}> 
													Sulje 
							</Button>
						</Grid>
						<Grid item>
							<Button style={{ float: 'right',  backgroundColor: '#d5c5fc'}} type="submit" variant="contained"> Tallenna muutokset
							</Button>
						</Grid>
					</Grid>
				</div>
			</Dialog></>
		)
	}
	
}

export default GroupInfo