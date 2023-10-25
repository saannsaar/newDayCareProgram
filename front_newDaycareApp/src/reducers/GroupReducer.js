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
		},
		editGroupInfo: (state, action) => {
			return action.payload
		}
	}
})

export const { setGroups, cleanGroupSlice, editGroupInfo} = groupReducer.actions

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

export const editGroup = (group) => {
	console.log(group)
	return async dispatch => {
		const edited_group = await groupService.updateGroup(group)
		dispatch(editGroupInfo(edited_group))
	}
}


export default groupReducer.reducer