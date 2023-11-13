import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import Item from './Item'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { editGroup } from '../reducers/GroupReducer'

const WorkerInfo = ({worker, group}) => {

	const dispatch = useDispatch()

	const handleDeleteWorkerInCharge = () => {

		const filteredWorkers = group.workers_in_charge.filter((w) => w.id != worker.id)

		const onlyIds = filteredWorkers.map((m) => m.id)
		const onlyChildrenIds = group.children.map((c) => c.id)

		const newgroup = {...group, children: onlyChildrenIds, workers_in_charge: onlyIds}
		dispatch(editGroup(newgroup))
	}

	return ( 
		<Item style={{ color: '#000000', marginTop: '1px', marginBottom: '0.5em' }}key={worker.name.concat('s')}>{worker.name} <Button onClick={() => handleDeleteWorkerInCharge()}><DeleteOutlineIcon></DeleteOutlineIcon></Button></Item>
	)

}

export default WorkerInfo