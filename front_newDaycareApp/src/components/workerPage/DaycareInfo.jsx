import Item from '../Item'
import { Typography } from '@mui/material'
import logopic from '../../pictures/examplelogo.png'

const DaycareInfo = ({ daycare }) => {


	return (
		<Item sx={{ p: 1, m: 1 }}>
			<img src={logopic} width='100px' alt='example logo' />
			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.address}</Typography>
			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.email}</Typography>
			<Typography style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}>{daycare.phone}</Typography></Item>
	)
}

export default DaycareInfo