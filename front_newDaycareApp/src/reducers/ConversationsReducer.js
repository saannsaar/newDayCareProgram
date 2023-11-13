import { createSlice } from '@reduxjs/toolkit'

import workerService from '../services/workers'
import parentService from '../services/parents'


const conversationsReducer = createSlice({
	name: 'conversations',
	initialState: [],
	reducers: {
		setPeople(state, action) {
			return action.payload
		},
		removePeople(state, action) {
			return []
		},

	}
})

export const { setPeople, removePeople } = conversationsReducer.actions

export const initializeConversation = (user_type) => {
	return async (dispatch) => {
		if (user_type == 'parent_user') {
			const workers = await workerService.getAll()
			dispatch(setPeople(workers))
		} else if (user_type =='worker_user') {
			const parents = await parentService.getAllParents()
			const workers = await workerService.getAll()
			const people = parents.concat(workers)
			dispatch(setPeople(people))
		}
		
	}
}

export const emptyConversations = () => {
	return async (dispatch) => (
		dispatch(removePeople())
	)
}

export default conversationsReducer.reducer