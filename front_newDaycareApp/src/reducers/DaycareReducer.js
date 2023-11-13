import { createSlice } from '@reduxjs/toolkit'
import daycareService from '../services/daycare'




const daycareReducer = createSlice({
	name: 'daycare',
	initialState: [],
	reducers: {
		setDaycare(state, action) {
			return action.payload
		},

		cleanDaycareState() {
			return []
		}
	}
})

export const {  setDaycare, cleanDaycareState } = daycareReducer.actions

export const initializeDaycare = (worker) => {

	return async dispatch => {
		const daycare = await daycareService.getDaycare(worker)
		dispatch(setDaycare(daycare))
	}
}

export const removeDaycare = () => {
	return async (dispatch) => {
		dispatch(cleanDaycareState())
	}
}



export default daycareReducer.reducer