import axios from 'axios'
const baseUrl = '/api/messages'
let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getConversation = async (receiver) => {
	const config = {
		headers: { Authorization: token },
	}
	const response =  await axios.get(baseUrl.concat('/').concat(receiver), config)
	return response.data
}

const sendMessage = async (messageInfo) => {
	const config = {
		headers: { Authorization: token },
	}

	const response =  await axios.post(baseUrl, messageInfo, config)
	return response.data

}

export default { setToken, getConversation, sendMessage } 