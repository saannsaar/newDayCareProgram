/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeConversation } from '../reducers/ConversationsReducer'
import { initializeMessages } from '../reducers/MessageReducer'

const Messages = (usertype, currentUser) => {



	const dispatch = useDispatch()
	const conversations = useSelector(state => state.conversations)
	const conversation = useSelector(state => state.messages)
	useEffect(() => {
		dispatch(initializeConversation(usertype))
		dispatch(initializeMessages())
	}, [])
	console.log(conversations)
	console.log(conversation)


	return (
		<div>
			Viestit sivu
		</div>
	)

}

export default Messages