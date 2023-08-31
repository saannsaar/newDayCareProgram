import { createSlice } from '@reduxjs/toolkit'
import workerService from '../services/workers'
const initialState = ''

const currentUserSlice = createSlice({
	name: 'currentuser',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return action.payload
		},
	}
})

export const { setUser } = currentUserSlice.actions



export const initializeCurrentWorker = (user) => {
	console.log('reducerissa')
	console.log(user)
	return async dispatch => {
		const worker = await workerService.getWorkerById(user)
		dispatch(setUser(worker))
	}
}


export default currentUserSlice.reducer