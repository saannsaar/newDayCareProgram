import { createSlice } from '@reduxjs/toolkit'



const errorReducer = createSlice({
	name: 'error',
	initialState: [],
	reducers: {
		setError(state, action) {
			return action.payload
		},
		removeError() {
			return []
		},

	}
})

export const { setError, removeError } = errorReducer.actions

export const initializeError = (error) => {

	return async (dispatch) => {
		dispatch(setError(error))
		setTimeout(()=> {
			dispatch(removeError())
		}, [10000])
		
	}
}

export default errorReducer.reducer