import { createSlice } from '@reduxjs/toolkit'
import groupService from '../services/groups'


const initialState = []
const groupReducer = createSlice({
	name: 'groups',
	initialState,
	reducers: {
		setGroups: (state, action) => {
			return action.payload
		},
	}
})

export const { setGroups } = groupReducer.actions

export const initializeGroups = () => {
	return async dispatch => {
		const groups = await groupService.getAllGroups()
		console.log(groups)
		dispatch(setGroups(groups))
	}
}

export default groupReducer.reducer