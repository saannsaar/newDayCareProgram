import { createSlice } from '@reduxjs/toolkit'
import messageService from '../services/message'
/* eslint-disable no-unused-vars */

const messageReducer = createSlice({
	name: 'messages',
	initialState: [],
	reducers: {
		setMessages(state, action) {
			return action.payload
		},
		removeMessages(state, action) {
			return []
		},
		appendMessage(state,action) {
			return state.push(action.payload)
		}
	}
})

export const { setMessages, removeMessages, appendMessage } = messageReducer.actions

export const initializeMessages = (receiver) => {
	return async (dispatch) => {
		const conversation = await messageService.getConversation(receiver)
		dispatch(setMessages(conversation))
	}
}

export const emptyMessages = () => {
	return async (dispatch) => (
		dispatch(removeMessages())
	)
}

export const sendNewMessage = (message) => {
	return async (dispatch) => {
		const conversation = await messageService.sendMessage(message)
		dispatch(appendMessage(conversation))
	}
}

export default messageReducer.reducer