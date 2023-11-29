import { createSlice } from '@reduxjs/toolkit'
import childService from '../services/children'
const initialState = ''

const currentChildSlice = createSlice({
	name: 'currentchild',
	initialState,
	reducers: {
		setCurrentChild: (state, action) => {
			return action.payload
		},

		removeCurrentCHild: () => {
			return ''
		},
	}
})

export const { setCurrentChild, removeCurrentCHild } = currentChildSlice.actions



export const initializeCurrentChild = (pickedChild) => {
	console.log(pickedChild)
	return async dispatch => {
		const findCHild = await childService.getSpesificChild(pickedChild.id)
		console.log(findCHild)
		dispatch(setCurrentChild(findCHild))
	}

}

export const removeCurrentUser = () => {
	return async (dispatch) => {
		dispatch(removeCurrentCHild())
	}
}


export default currentChildSlice.reducer