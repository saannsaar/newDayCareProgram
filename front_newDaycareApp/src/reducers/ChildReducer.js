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
		// eslint-disable-next-line no-unused-vars
		cleanChildrenState(state) {
			return []
		}
	}
})

export const {  appendChildren, setChildren,setParentsChildren, cleanChildrenState } = childrenReducer.actions

export const initializeChildren = (loggedinUser, usertype) => {
	console.log(loggedinUser, usertype)
	if (usertype === 'worker_user') {
		return async dispatch => {
			const children = await childService.getAll()
			dispatch(setChildren(children))
		}
	}

	if (usertype === 'parent_user' && loggedinUser.children.length > 1) {
		console.log('More than one child ')
		const childArray = []
		
		loggedinUser.children?.map(async (childId)=>{
			const addChild = await childService.getSpesificChild(childId)
			console.log(addChild)
			childArray.push(addChild)
		})
		return async dispatch => {
			console.log(childArray)
			dispatch(setChildren(childArray))
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

// export const initializeParentsChildren = (loggedinParent) => {

// 	console.log(loggedinParent)
// 	if (loggedinParent.children.length > 1) {
// 		console.log('More than one child ')
// 		const childArray = []
		
// 		loggedinParent.children?.map(async (childId)=>{
// 			const addChild = await childService.getSpesificChild(childId)
// 			childArray.push(addChild)
// 		})
// 		return async dispatch => {
// 			dispatch(setParentsChildren(childArray))
// 		}
// 	}
// 	else {
// 		return async dispatch => {
// 			const children = await childService.getSpesificChild(loggedinParent.children[0])
// 			dispatch(setParentsChildren(children))
// 		}
// 	}
// }

export const createChild = content => {
	console.log('REDUCERISSA')
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