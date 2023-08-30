import { createSlice } from '@reduxjs/toolkit'
import childService from '../services/children'




const childrenReducer = createSlice({
	name: 'children',
	initialState: [],
	reducers: {
		appendChildren(state, action) {
			state.push(action.payload)
		},
		setChildren(state, action) {
			return action.payload
		},
	}
})

export const {  appendChildren, setChildren } = childrenReducer.actions

export const initializeChildren = () => {
	return async dispatch => {
		const children = await childService.getAll()
		dispatch(setChildren(children))
	}
}

export const createChild = content => {
	console.log('REDUCERISSA')
	return async dispatch => {
		const newChild = await childService.create(content)
		dispatch(appendChildren(newChild))
	}
}




export default childrenReducer.reducer