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
		},
		removeEvent(state, action) {
			console.log(state,action)
			return state.filter(e => e.id !== action.payload)
		}
	}
})

export const { setEvents, cleanEvent, removeEvent } = eventReducer.actions

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

export const deleteEvent = (id ) => {
	return async dispatch => {
		// eslint-disable-next-line no-unused-vars
		const deleteEvent = await eventService.deleteEvent(id)
		dispatch(removeEvent(id))
	}

}

export default eventReducer.reducer