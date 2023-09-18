import { createSlice } from '@reduxjs/toolkit'
import childService from '../services/children'




const childrenReducer = createSlice({
	name: 'children',
	initialState: [],
	reducers: {
		appendChildren(state, action) {
			state.push(action.payload)
		},
		setParentsChildren(state, action) {
			state = []
			state.push(action.payload)
		},
		setChildren(state, action) {
			return action.payload
		},
	}
})

export const {  appendChildren, setChildren,setParentsChildren } = childrenReducer.actions

export const initializeChildren = () => {
	
	return async dispatch => {
		const children = await childService.getAll()
		dispatch(setChildren(children))
	}
}

export const initializeParentsChildren = (loggedinParent) => {

	console.log(loggedinParent)
	if (loggedinParent.children.length > 1) {
		console.log('More than one child ')
		const childArray = []
		
		loggedinParent.children?.map(async (childId)=>{
			const addChild = await childService.getSpesificChild(childId)
			childArray.push(addChild)
		})
		return async dispatch => {
			dispatch(setParentsChildren(childArray))
		}
	}
	else {
		return async dispatch => {
			const children = await childService.getSpesificChild(loggedinParent.children[0])
			dispatch(setParentsChildren(children))
		}
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