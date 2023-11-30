import Item from '../Item'
import { Typography } from '@mui/material'

// Component to render item which contains daycare's info, address, email and phonenumber
const DaycareInfo = ({ daycare }) => {

	return (
		<Item sx={{ p: 1, m: 1 }}>

			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.address}</Typography>
			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.email}</Typography>
			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.phone}</Typography></Item>
	)
}
 

export default DaycareInfo