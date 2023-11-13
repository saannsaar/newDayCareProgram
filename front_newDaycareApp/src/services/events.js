import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/events'  
// const baseUrl = '/api/events'

let token = null

const setTokenForEvent = newToken => {
	token = `bearer ${newToken}`
}

const getAllEvents = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const createEvent = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const getEventById = async (event) => {
	const response = await axios.get(baseUrl.concat('/').concat(event.id))
	return response.data
}

const deleteEvent = async (id) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.delete(baseUrl.concat('/').concat(id), config)
	return response.data
}


export default { getAllEvents, createEvent,  setTokenForEvent, deleteEvent, getEventById }