import { Button,TextField, Grid, DialogTitle, Divider, DialogContent, Dialog, Select, MenuItem } from '@mui/material'
import { createChild } from '../../reducers/ChildReducer'
import { useDispatch } from 'react-redux'
import {  useState } from 'react'


// Component for adding a new child's information to the system. 
// There is a button which opens a dialog including a form where the user can
// add all the necessary information and then save them
const AddNewChild = ({ daycare, groups }) => {

	if (groups && daycare) {
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
							<Select value={group} onChange={({ target }) => setGroup(target.value)}>
								{groups.map((g) => (
									<MenuItem key={g.id} value={g.name}>{g.name}</MenuItem>
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