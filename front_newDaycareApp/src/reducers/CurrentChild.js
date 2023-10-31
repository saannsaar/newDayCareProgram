import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const currentChildSlice = createSlice({
	name: 'currentchild',
	initialState,
	reducers: {
		setCurrentChild: (state, action) => {
			return action.payload
		},
		// eslint-disable-next-line no-unused-vars
		removeCurrentCHild: (state) => {
			return ''
		},
	}
})

export const { setCurrentChild, removeCurrentCHild } = currentChildSlice.actions



export const initializeCurrentChild = (pickedChild) => {
	console.log('reducerissa', pickedChild)
	return async dispatch => {
		dispatch(setCurrentChild(pickedChild))
	}

}

export const removeCurrentUser = () => {
	return async (dispatch) => {
		dispatch(removeCurrentCHild())
	}
}


export default currentChildSlice.reducer