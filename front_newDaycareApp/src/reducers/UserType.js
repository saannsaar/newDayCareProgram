import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const userTypeReducer = createSlice({
	name: 'userType',
	initialState,
	reducers: {
		setUserType: (state, action) => {
			return action.payload
		},
		// eslint-disable-next-line no-unused-vars
		removeUserType: (state) => {
			return ''
		},
	}
})

export const { setUserType, removeUserType } = userTypeReducer.actions

export const initializeUserType = (u_type) => {
	return async dispatch => {
		dispatch(setUserType(u_type))
	}
}

export const removeType = () => {
	return async (dispatch) => {
		dispatch(removeUserType())
	}
}

export default userTypeReducer.reducer