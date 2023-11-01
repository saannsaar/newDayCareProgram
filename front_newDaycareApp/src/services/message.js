import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/messages'  
// const baseUrl = '/api/messages'
let token = null

const setToken = newToken => {
	console.log('Set token servicesss')
	token = `bearer ${newToken}`
}

const getConversation = async (receiver) => {
	const config = {
		headers: { Authorization: token },
	}
	const response =  await axios.get(baseUrl.concat('/'), receiver, config)
	return response.data
}

const sendMessage = async (messageInfo) => {
	const config = {
		headers: { Authorization: token },
	}

	const response =  await axios.post(baseUrl.concat('/'), messageInfo, config)
	return response.data

}

export default { setToken, getConversation, sendMessage } 