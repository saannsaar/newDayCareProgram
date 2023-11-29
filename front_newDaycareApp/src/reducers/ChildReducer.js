import { createSlice } from '@reduxjs/toolkit'
import childService from '../services/children'




const childrenReducer = createSlice({
	name: 'children',
	initialState: [],
	reducers: {
		appendChildren: (state, action) => {state = state.push(action.payload)}
		,
		setParentsChildren(state, action) {
			state = []
			return state.push(action.payload)
		},
		setChildren(state, action) {
			console.log(action.payload)
			return action.payload
		},
		cleanChildrenState() {
			return []
		}
	}
})

export const {  appendChildren, setChildren,setParentsChildren, cleanChildrenState } = childrenReducer.actions

export const initializeChildren = (loggedinUser, usertype) => {
	
	if (usertype === 'worker_user') {
		return async dispatch => {
			const children = await childService.getAll()
			dispatch(setChildren(children))
		}
	}

	if (usertype === 'parent_user' && loggedinUser.children.length > 1) {

		return async dispatch => {
		
			dispatch(setChildren(loggedinUser.children))
		}
	}
	if (usertype === 'parent_user' && loggedinUser.children.length === 1) {
		const childArray = []
		return async dispatch => {
			const addChild = await childService.getSpesificChild(loggedinUser.children[0])
			childArray.push(addChild)
			dispatch(setChildren(childArray))
		}
	}

}




export const createChild = content => {

	return async dispatch => {
		const newChild = await childService.create(content)
		dispatch(appendChildren(newChild))
	}

}

export const removeChildren = () => {
	return async (dispatch) => {
		dispatch(cleanChildrenState())
	}
}



export default childrenReducer.reducer