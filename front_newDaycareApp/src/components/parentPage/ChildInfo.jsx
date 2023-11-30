import {  Grid, Typography, Menu, MenuItem} from '@mui/material'
import childService from '../../services/children'
import { useDispatch, useSelector } from 'react-redux'
import Item from '../Item'
import LoadingIcons from 'react-loading-icons'
import { useState } from 'react'
import { Button } from '@mui/material'
import { initializeChildren } from '../../reducers/ChildReducer'


// COmponent that renders a single child's information, a bit differently depending if it is a parent-user
// or worker-user who is logged in. Worker-user also can modify the "diapers" value from here with the select
// input. 
const ChildInfo = ({ kidinfo, usertype }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
		console.log(event.currentTarget)
	}
	const loggedInUser = useSelector(state => state.currentUser)
	const dispatch = useDispatch(

	)
	const handleClose = async (value) => {
		
		console.log(value)
		const editedChild = {
			...kidinfo,
			diapers: value
		}
		console.log(editedChild)
		await childService.editChild({...kidinfo, diapers: value})
		await dispatch(initializeChildren(loggedInUser, usertype))
		setAnchorEl(null)
	}

	if(!kidinfo ) {
		return (
			<LoadingIcons.Oval stroke="#5d756b" speed={.75} style={{paddingLeft: '40px', paddingTop: '20px'}}/>
		)
	} else {

		if (usertype === 'parent_user') {
			return (
				<><Grid item xs={6}>
					<Item> Vaipat: {kidinfo.diapers}  </Item>
				</Grid><Grid item xs={6}>
					<Item>{kidinfo.name}</Item>
				</Grid></>
			)
		} else if (usertype === 'worker_user'){

			return (
				<div>
					<Item>
						<Typography> Nimi: {kidinfo.name} </Typography>
						<Typography> Syntynyt: {kidinfo.born} </Typography>
						<Typography>
							<Button id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}>Vaipat: </Button> 
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem value='FULL' onClick={() => handleClose('FULL')}>FULL</MenuItem>
								<MenuItem value='HALF'onClick={() => handleClose('HALF')}>HALF</MenuItem>
								<MenuItem value='EMPTY'onClick={() => handleClose('EMPTY')}>EMPTY</MenuItem>
							</Menu>
							{kidinfo.diapers}
						</Typography>
					</Item>
				</div>
			)
		}

	}
}

export default ChildInfo