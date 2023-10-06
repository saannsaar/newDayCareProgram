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
		// eslint-disable-next-line no-unused-vars
		cleanGroupSlice: (state) => {
			return []
		}
	}
})

export const { setGroups, cleanGroupSlice} = groupReducer.actions

export const initializeGroups = () => {
	return async dispatch => {
		const groups = await groupService.getAllGroups()
		console.log(groups)
		dispatch(setGroups(groups))
	}
}

export const removeGroups = () => {
	return async (dispatch) => {
		dispatch(cleanGroupSlice())
	}
}

export default groupReducer.reducer