import { createSlice } from '@reduxjs/toolkit'

import childService from '../services/children'




const caretimeReducer = createSlice({
	name: 'children',
	initialState: '',
	reducers: {
		setAllCaretime(state, action) {
			
			return action.payload
		},
		appendCaretime(state, action) {
			console.log(state)
			return [...state, action.payload]
		},
		// eslint-disable-next-line no-unused-vars
		cleanChildCaretime(state) {
			return ''
		}
	}
})

export const {  setAllCaretime, cleanChildCaretime, appendCaretime } = caretimeReducer.actions

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

export const removeCaretimes = () => {
	return async (dispatch) => {
		dispatch(cleanChildCaretime())
	}
}

export default caretimeReducer.reducer