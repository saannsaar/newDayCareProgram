import { createSlice } from '@reduxjs/toolkit'
import parentService from '../services/parents'

const initialState = ''

const parentReducer = createSlice({
	name: 'parents',
	initialState,
	reducers: {
		setParents: (state, action) => {
			return action.payload
		},
		
	}
})

export const { setParents } = parentReducer.actions

export const initializeParents = () => {
	return async dispatch => {
		const parents = await parentService.getAllParents()
		dispatch(setParents(parents))
	}
}



export default parentReducer.reducer