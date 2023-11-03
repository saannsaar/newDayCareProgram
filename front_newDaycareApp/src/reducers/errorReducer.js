import { createSlice } from '@reduxjs/toolkit'

/* eslint-disable no-unused-vars */

const errorReducer = createSlice({
	name: 'error',
	initialState: [],
	reducers: {
		setError(state, action) {
			return action.payload
		},
		removeError(state, action) {
			return []
		},

	}
})

export const { setError, removeError } = errorReducer.actions

export const initializeError = (error) => {
	console.log(error)
	return async (dispatch) => {
		dispatch(setError(error))
		setTimeout(()=> {
			dispatch(removeError())
		}, [10000])
		
	}
}

export default errorReducer.reducer