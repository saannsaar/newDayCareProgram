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

		cleanGroupSlice: () => {
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
		dispatch(setGroups(groups))
	}
}

export const removeGroups = () => {
	return async (dispatch) => {
		dispatch(cleanGroupSlice())
	}
}

export const editGroup = (group) => {

	return async dispatch => {
		const edited_group = await groupService.updateGroup(group)
		dispatch(editGroupInfo(edited_group))
	}
}


export default groupReducer.reducer