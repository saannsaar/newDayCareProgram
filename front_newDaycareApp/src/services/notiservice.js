import axios from 'axios'
const baseUrl = '/api/notifications'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAllNotifications = async () => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}



const postNotification = async newNotification => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newNotification, config)
	return response.data
}

const deleteNotification = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.delete(baseUrl.concat('/').concat(id), config)
	return response.data
}
export default { getAllNotifications, postNotification, deleteNotification, setToken }