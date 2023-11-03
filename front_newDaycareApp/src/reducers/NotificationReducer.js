/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

import notiservice from '../services/notiservice'

const notificationReducer = createSlice({
	name: 'notifications',
	initialState: [],
	reducers: {
		setNotifications(state, action) {
			return action.payload
		},
		removeNotifications(state, action) {
			return []
		}, 
		appendNotification(state, action) {
			state.push(action.payload)
		},
		removeNotification(state, action) {
			console.log(state,action)
			return state.filter(n => n.id !== action.payload)
		}
	}
})

export const { appendNotification, setNotifications, removeNotification, removeNotifications} = notificationReducer.actions
export const initializeNotifications = (loggedInUser) => {
	console.log('initialize notifications')
    
	return async dispatch => {
		const allnotifications = await notiservice.getAllNotifications()
		dispatch(setNotifications(allnotifications))
	}
}

export const createNotification = newNoti => {
	console.log('Create noti')
	return async dispatch => {
		const newNotification = await notiservice.postNotification(newNoti)
		dispatch(appendNotification(newNotification))
	}
}

export const emptyNotifications = () => {
	return async (dispatch) => {
		dispatch(removeNotifications())
	}
}

export const deleteNotification = (id) => {
	return async dispatch => {
		const edited_noti = await notiservice.deleteNotification(id)
		dispatch(removeNotification(id))
	}
}
export default notificationReducer.reducer
