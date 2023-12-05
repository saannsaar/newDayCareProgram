import { Button,TextField, Grid, DialogTitle, Divider, DialogContent, Dialog, Select, MenuItem, InputLabel, OutlinedInput } from '@mui/material'
import { createChild } from '../../reducers/ChildReducer'
import { useDispatch } from 'react-redux'
import {  useState } from 'react'


// Component for adding a new child's information to the system. 
// There is a button which opens a dialog including a form where the user can
// add all the necessary information and then save them
const AddNewChild = ({ daycare, groups, parentsData }) => {

	if (groups && daycare && parentsData) {
		console.log(parentsData)
		const [name, setName] = useState('')
		const [born, setBorn] = useState('')
		const [monthly_maxtime, setMonthlyMax] = useState('')
		const [group, setGroup] = useState(groups[0].name)
		const [modalOpen, setmodalOpen] = useState(false)
		const dispatch = useDispatch()

		const handleModalOpen = () => {
			setmodalOpen(true)
		}

		const handleModalClose = () => {
			setmodalOpen(false)
		}

		const handleAddChild = async(e) => {
		
			e.preventDefault()
			try{
				console.log(parents)
				// Find the group based on the name so that the right id is found
				const findgroup = groups.find((g) => group == g.name)
				const newChild ={
					name: name,
					born: born,
					parents: parents,
					monthly_maxtime: parseInt(monthly_maxtime),
					daycare: daycare.id,
					group: findgroup.id
				}
				console.log(newChild)
				dispatch(createChild(newChild))
				setName('')
				setBorn('')
				setParentsNames([])
				setMonthlyMax('')
				setGroup('')
				setmodalOpen(false)
			} catch (error) {
				// console.log(error)
			}
		}


		const [parents, setParentsNames] = useState([])

		const handleParentChange = (e) => {
			const { target: { value }} = e
			setParentsNames(typeof value === 'string' ? value.split(',') : value)
		}

		return (
			<><Button onClick={() => handleModalOpen()}> Lisää uusi lapsi </Button><Dialog fullWidth={true} open={modalOpen} onClose={() => handleModalClose()}>
				<DialogTitle>
                Lisää uusi lapsi
				</DialogTitle>
				<Divider />
				<DialogContent>
					<div>
						<form style={{ height: '20px' }} onSubmit={handleAddChild}>
							<TextField label="Nimi" fullWidth value={name} onChange={({ target }) => setName(target.value)} />
							<TextField label="Syntynyt" fullWidth value={born} onChange={({ target }) => setBorn(target.value)} />
							<TextField label="Max hoitoaika" fullWidth value={monthly_maxtime} onChange={({ target }) => setMonthlyMax(target.value)} />
							<InputLabel> Vanhemmat </InputLabel>
							<Select  labelId="demo-multiple-name-label"
								id="demo-multiple-name"
								multiple
								value={parents}
								onChange={handleParentChange}
								input={<OutlinedInput label="Name" />}>
								{parentsData.map((p, index) => (
									<MenuItem key={index} value={p.name}> {p.name}</MenuItem>
								))}
							</Select>
							<Select value={group} onChange={({ target }) => setGroup(target.value)}>
								{groups.map((g, index) => (
									<MenuItem key={index} value={g.name}>{g.name}</MenuItem>
								))}
							</Select>
							<Grid>

								<Grid item>
									<Button style={{ float: 'right', }} type="submit" variant="contained"> Tallenna uuden lapsen tiedot
									</Button>
								</Grid>
							</Grid>
						</form>
					</div>
				</DialogContent>
			</Dialog></>
	
		)
	}
	
}

export default AddNewChild
