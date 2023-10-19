import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/notifications' 
// const baseUrl = '/api/notifications'

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
	console.log('Service postNotification -- ', newNotification)
	const response = await axios.post(baseUrl, newNotification, config)
	console.log(response.data)
	return response.data
}
export default { getAllNotifications, postNotification, setToken }