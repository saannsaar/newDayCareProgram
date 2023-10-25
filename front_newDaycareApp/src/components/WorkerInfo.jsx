/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import Item from './Item'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { editGroup } from '../reducers/GroupReducer'

const WorkerInfo = ({worker, group}) => {

	const dispatch = useDispatch()
	const handleDeleteWorkerInCharge = () => {
		console.log('HALOO')
		const filteredWorkers = group.workers_in_charge.filter((w) => w.id != worker.id)
		const onlyIds = filteredWorkers.map((m) => m.id)
		console.log(onlyIds)
		const newgroup = {...group, workers_in_charge: onlyIds}

		console.log(newgroup)
		dispatch(editGroup(newgroup))
	}

	return ( 
		<Item key={worker.name.concat('s')}>{worker.name} <Button onClick={() => handleDeleteWorkerInCharge()}><DeleteOutlineIcon></DeleteOutlineIcon></Button></Item>
	)

}

export default WorkerInfo