import { createSlice } from '@reduxjs/toolkit'

import childService from '../services/children'
import { initializeError } from './errorReducer'




const caretimeReducer = createSlice({
	name: 'children',
	initialState: '',
	reducers: {
		setAllCaretime(state, action) {
			
			return state = action.payload
		},
		appendCaretime(state, action) {
			return state = action.payload
		},
		changedCaretime(state, action) {
			return state.map(caretime => caretime._id == action.payload._id ? action.payload : caretime)
		},
		cleanChildCaretime() {
			return ''
		},
		spliceDeletedCaretime(state, action) {
			return state.filter(caretime => caretime._id !== action.payload._id)
		}
	}
})

export const {  setAllCaretime, cleanChildCaretime, appendCaretime, changedCaretime, spliceDeletedCaretime } = caretimeReducer.actions

export const initializeCaretimes = (loggedInUser, usertype, kids, currentChild) => {
	const apuarr = []

	if (usertype == 'parent_user' && currentChild) {
		
		return async dispatch => {

			dispatch(setAllCaretime([currentChild.care_time, currentChild.caretimes_added_monthlysum]))
		}	

	} else {
		return async dispatch => {
	
			for (let i = 0; i < kids.length; i++) {
				const caretimes = Object.values(kids[i].care_time)
				apuarr.push(caretimes)

			}
			console.log(apuarr)
				
			dispatch(setAllCaretime(apuarr))
		}	
	}
	
	
}

export const createCaretime = (content, childid) => {
	return async dispatch => {
		try{
			const newTime = await childService.addCaretime(content, childid)
			console.log(newTime)
			dispatch(appendCaretime([newTime.care_time, newTime.caretimes_added_monthlysum]))
		} catch(error) {
			console.log(error)
			dispatch(initializeError(error.response.data.error))
		}
	}

}
export const modifyCaretime = (content, childid) => {

	return async dispatch => {
		const modifiedCaretime = await childService.editCaretime(content, childid)
		dispatch(appendCaretime([modifiedCaretime.care_time, modifiedCaretime.caretimes_added_monthlysum]))
		
	}
}
export const deleteSpesificCaretime = (ctid, childid) => {

	return async dispatch => {
		const modifiedCaretimes = await childService.deleteCaretime(ctid, childid)
		console.log(modifiedCaretimes)
		dispatch(appendCaretime([modifiedCaretimes.care_time, modifiedCaretimes.caretimes_added_monthlysum]))
	}
}

export const removeCaretimes = () => {
	return async (dispatch) => {
		dispatch(cleanChildCaretime())
	}
}

export default caretimeReducer.reducer