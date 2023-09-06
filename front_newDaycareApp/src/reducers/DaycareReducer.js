import { createSlice } from '@reduxjs/toolkit'
import daycareService from '../services/daycare'




const daycareReducer = createSlice({
	name: 'daycare',
	initialState: [],
	reducers: {
		setDaycare(state, action) {
			return action.payload
		},
	}
})

export const {  setDaycare } = daycareReducer.actions

export const initializeDaycare = (worker) => {
	console.log(worker)
	return async dispatch => {
		const daycare = await daycareService.getDaycare(worker)
		dispatch(setDaycare(daycare))
	}
}


export default daycareReducer.reducer