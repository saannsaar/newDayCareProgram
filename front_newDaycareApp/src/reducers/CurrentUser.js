import { createSlice } from '@reduxjs/toolkit'
import workerService from '../services/workers'
import parentService from '../services/parents'
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
			return action.payload
		}
	}
})

export const { setUser, removeUser, editUserInfo } = currentUserSlice.actions



export const initializeCurrentWorker = (user) => {
	console.log('reducerissa')
	console.log(user.user_type)
	if( user.user_type === 'worker_user') {
		return async dispatch => {
			const worker = await workerService.getWorkerById(user)
			dispatch(setUser(worker))
		}
	} else if ( user.user_type === 'parent_user') {
		return async dispatch => {
			const parent = await parentService.getParentById(user)
			dispatch(setUser(parent))
		}
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