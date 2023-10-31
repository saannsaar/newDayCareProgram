import { createSlice } from '@reduxjs/toolkit'

import childService from '../services/children'




const caretimeReducer = createSlice({
	name: 'children',
	initialState: '',
	reducers: {
		setAllCaretime(state, action) {
			
			return state = action.payload
		},
		appendCaretime(state, action) {
			console.log(state)
			return [...state, action.payload]
		},
		changedCaretime(state, action) {
			return state.map(caretime => caretime._id == action.payload._id ? action.payload : caretime)
		},
		// eslint-disable-next-line no-unused-vars
		cleanChildCaretime(state) {
			return ''
		},
		spliceDeletedCaretime(state, action) {
			return state.filter(caretime => caretime._id !== action.payload._id)
		}
	}
})

export const {  setAllCaretime, cleanChildCaretime, appendCaretime, changedCaretime, spliceDeletedCaretime } = caretimeReducer.actions

export const initializeCaretimes = (loggedInUser, usertype, kids, currentChild) => {
	console.log(loggedInUser, usertype, kids, currentChild)

	

	if (usertype == 'parent_user' && currentChild) {
		
		return async dispatch => {
			dispatch(setAllCaretime(currentChild.care_time))
		}	
	} else {
		return async dispatch => {
			const apuarr = []
			for (let i = 0; i < kids.length; i++) {
				const caretimes = Object.values(kids[i].care_time)
				apuarr.push(caretimes)
			}
				
			dispatch(setAllCaretime(apuarr[0]))
		}	
	}
	
	
}

export const createCaretime = (content, childid) => {
	console.log('REDUCERISSA')
	console.log(content)
	console.log(childid)
	return async dispatch => {
		const newTime = await childService.addCaretime(content, childid)
		dispatch(appendCaretime(newTime))
	}

}
export const modifyCaretime = (content, childid) => {
	console.log('Muokkaus reducer')
	console.log(content)
	console.log(childid)

	return async dispatch => {
		const modifiedCaretime = await childService.editCaretime(content, childid)
		dispatch(changedCaretime(modifiedCaretime))
	}
}
export const deleteSpesificCaretime = (ctid, childid) => {
	console.log(ctid)
	return async dispatch => {
		await childService.deleteCaretime(ctid, childid)
		dispatch(spliceDeletedCaretime(ctid))
	}
}

export const removeCaretimes = () => {
	return async (dispatch) => {
		dispatch(cleanChildCaretime())
	}
}

export default caretimeReducer.reducer