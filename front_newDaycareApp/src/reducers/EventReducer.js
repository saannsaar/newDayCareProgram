import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'
const initialState = []

const eventReducer = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEvents: (state, action) => {
			return action.payload
		}
	}
})

export const { setEvents } = eventReducer.actions

export const initializeEvents = () => {
	return async dispatch => {
		const events = await eventService.getAllEvents()
		dispatch(setEvents(events))
	}
}

export default eventReducer.reducer