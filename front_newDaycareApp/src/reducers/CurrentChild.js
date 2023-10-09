import { createSlice } from '@reduxjs/toolkit'
import childSercive from '../services/children'
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
	console.log('reducerissa')
	return async dispatch => {
		const child = await childSercive.getSpesificChild(pickedChild)
		dispatch(setCurrentChild(child))
	}

}

export const removeCurrentUser = () => {
	return async (dispatch) => {
		dispatch(removeCurrentCHild())
	}
}


export default currentChildSlice.reducer