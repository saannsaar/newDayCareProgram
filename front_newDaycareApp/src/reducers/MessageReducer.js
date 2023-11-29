import { createSlice } from '@reduxjs/toolkit'
import messageService from '../services/message'
import { initializeError } from './errorReducer'


const messageReducer = createSlice({
	name: 'messages',
	initialState: [],
	reducers: {
		setMessages(state, action) {
			return action.payload
		},
		removeMessages() {
			return []
		},
		appendMessage(state,action) {
			console.log(action.payload)
			state.push(action.payload)
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
		try {
			
			const conversation = await messageService.sendMessage(message)
			dispatch(appendMessage(conversation))
			
		} catch (error) {
			dispatch(initializeError(error))
		}

	}
}

export default messageReducer.reducer