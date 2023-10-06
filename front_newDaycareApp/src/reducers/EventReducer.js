import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'
const initialState = []

const eventReducer = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEvents: (state, action) => {
			return action.payload
		},
		// eslint-disable-next-line no-unused-vars
		cleanEvent: (state) => {
			return []
		}
	}
})

export const { setEvents, cleanEvent } = eventReducer.actions

export const initializeEvents = () => {
	return async dispatch => {
		const events = await eventService.getAllEvents()
		dispatch(setEvents(events))
	}
}

export const removeEvents = () => {
	return async (dispatch) => {
		dispatch(cleanEvent())
	}
}

export default eventReducer.reducer