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
		// eslint-disable-next-line no-unused-vars
		removeUser: (state) => {
			return ''
		},
		editUserInfo: (state, action) => {
			// EPÄVARMA
			return action.payload
		}
	}
})

export const { setUser, removeUser, editUserInfo } = currentUserSlice.actions



export const initializeCurrentWorker = (user) => {
	console.log('reducerissa')
	console.log(user)
	return async dispatch => {
		const worker = await workerService.getWorkerById(user)
		dispatch(setUser(worker))
	}
}

export const removeCurrentUser = () => {
	return async (dispatch) => {
		dispatch(removeUser())
	}
}

export const editUser = (user, id) => {
	console.log(user, 'EDIT')
	console.log(id)
	return async dispatch => {
		const edited_user = await workerService.editUser(user, id)
		dispatch(editUserInfo(edited_user))
	}
}


export default currentUserSlice.reducer