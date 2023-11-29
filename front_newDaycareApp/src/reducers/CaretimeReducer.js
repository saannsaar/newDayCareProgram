import { createSlice } from '@reduxjs/toolkit'

import childService from '../services/children'
import { initializeError } from './errorReducer'




const caretimeReducer = createSlice({
	name: 'caretimes',
	initialState: [],
	reducers: {
		setAllCaretime(state, action) {
			return state = action.payload 
		},
		appendCaretime(state, action) {
			return state = action.payload
		},
		changedCaretime(state, action) {
			state = state.map(caretime => caretime._id == action.payload._id ? action.payload : caretime)
		},
		cleanChildCaretime(state) {
			// eslint-disable-next-line no-unused-vars
			return state = []
		},
		spliceDeletedCaretime(state, action) {
			return state.filter(caretime => caretime._id !== action.payload._id)
		}
	}
})

export const {  setAllCaretime, cleanChildCaretime, appendCaretime, changedCaretime, spliceDeletedCaretime } = caretimeReducer.actions

export const initializeCaretimes = (kids) => {
	const apuarr = []
	console.log(kids)

	
	return async dispatch => {

		for (let i = 0; i < kids.length; i++) {
			console.log(kids)
			const caretimes = Object.values(kids[i].care_time)
			const catimesAddedMonthlySum = kids[i].caretimes_added_monthlysum
			const oneChildsInfo = {
				name: kids[i].name,
				care_time: caretimes, 
				caretimes_added_monthlysum: catimesAddedMonthlySum
			}
			apuarr.push(oneChildsInfo )
				
		}

				
		dispatch(setAllCaretime(apuarr))
		
	}
	
	
}

export const createCaretime = (content, childid) => {
	return async dispatch => {
		try{
			const newTime = await childService.addCaretime(content, childid)

			dispatch(appendCaretime([newTime.care_time, newTime.caretimes_added_monthlysum]))
		} catch(error) {
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

		dispatch(appendCaretime([modifiedCaretimes.care_time, modifiedCaretimes.caretimes_added_monthlysum]))
	}
}

export const removeCaretimes = () => {
	return async dispatch => {
		dispatch(cleanChildCaretime())
	}
}

export default caretimeReducer.reducer