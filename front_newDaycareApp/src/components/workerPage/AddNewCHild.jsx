import { Button,TextField, Grid, DialogTitle, Divider, DialogContent, Dialog, Select, MenuItem, InputLabel, OutlinedInput } from '@mui/material'
import { createChild } from '../../reducers/ChildReducer'
import { useDispatch } from 'react-redux'
import {  useState } from 'react'


// Component for adding a new child's information to the system. 
// There is a button which opens a dialog including a form where the user can
// add all the necessary information and then save them
const AddNewChild = ({ daycare, groups, parents }) => {

	if (groups && daycare && parents) {
		console.log(parents)
		const [name, setName] = useState('')
		const [born, setBorn] = useState('')
		const [parents, setParents] = useState('')
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
				console.log(personName)
				const parentsArray = parents.split(', ')
				// Find the group based on the name so that the right id is found
				const findgroup = groups.find((g) => group == g.name)
				const newChild ={
					name: name,
					born: born,
					parents: parentsArray,
					monthly_maxtime: parseInt(monthly_maxtime),
					daycare: daycare.id,
					group: findgroup.id
				}
				dispatch(createChild(newChild))

				setName('')
				setBorn('')
				setParents('')
				setMonthlyMax('')
				setGroup('')
			} catch (error) {
				// console.log(error)
			}
		}


		const [personName, setPersonName] = useState([])
		const handleChange = (event) => {
			const { target: { value }} = event
			setPersonName(typeof value === 'string' ? value.split(',') : value)
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
							<TextField label="Vanhemmat" fullWidth value={parents} onChange={({ target }) => setParents(target.value)} />
							<InputLabel> Vanhemmat </InputLabel>
							<Select  labelId="demo-multiple-name-label"
								id="demo-multiple-name"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Name" />}>
								{parents.map((p, index) => (
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
