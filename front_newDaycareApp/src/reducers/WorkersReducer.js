import { createSlice } from '@reduxjs/toolkit'
import workerService from '../services/workers'
const initialState = ''

const usersSlice = createSlice({
	name: 'workers',
	initialState,
	reducers: {
		setWorkers: (state, action) => {
			return action.payload
		},
	}
})

export const { setWorkers } = usersSlice.actions

export const initializeWorkers = () => {
	return async dispatch => {
		const workers = await workerService.getAll()
		dispatch(setWorkers(workers))
	}
}

export default usersSlice.reducer