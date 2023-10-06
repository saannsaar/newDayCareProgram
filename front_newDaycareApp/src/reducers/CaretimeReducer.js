import { createSlice } from '@reduxjs/toolkit'
import caretimeService from '../services/caretimes'


const caretimeReducer = createSlice({
	name: 'children',
	initialState: [],
	reducers: {
		setAllCaretime(state, action) {
			return action.payload
		},
		appendCaretime(state, action) {
			state.push(action.payload)
		},
		// eslint-disable-next-line no-unused-vars
		cleanChildCaretime(state) {
			return []
		}
	}
})

export const {  setAllCaretime, cleanChildCaretime, appendCaretime } = caretimeReducer.actions

export const initializeCaretimes = (loggedInUser, usertype, kids) => {
	console.log(loggedInUser, usertype, kids)

	

	if (usertype === 'parent_user') {
		return async dispatch => {
			const apuarr = []
			for (let i = 0; i < kids.length; i++) {
				const caretimes = Object.values(kids[i].care_time)
				apuarr.push(caretimes)
			}
            
			dispatch(setAllCaretime(apuarr))
		}	
	}
	else return async dispatch => {
    
		const ct = await caretimeService.getAllCaretimes()
		dispatch(setAllCaretime(ct))
		
	}
}

export const createCaretime = content => {
	console.log('REDUCERISSA')
	console.log(content)
	return async dispatch => {
		const newTime = await caretimeService.createCaretime(content)
		dispatch(appendCaretime(newTime))
	}

}

export const removeCaretimes = () => {
	return async (dispatch) => {
		dispatch(cleanChildCaretime())
	}
}

export default caretimeReducer.reducer