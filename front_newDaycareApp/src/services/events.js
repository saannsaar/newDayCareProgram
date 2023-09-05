import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/events'  
// const baseUrl = '/api/events'

let token = null

const setTokenForEvent = newToken => {
	token = `bearer ${newToken}`
}

const getAllEvents = () => {
	const request = axios.get(baseUrl)
	console.log(request)
	return request.then(response => response.data)
}

const createEvent = async newObject => {
	console.log('Creating new event')
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const getEventById = async (event) => {
	console.log('SERVICE Event', event)
	const response = await axios.get(baseUrl.concat('/').concat(event.id))
	return response.data
}


export default { getAllEvents, createEvent,  setTokenForEvent, getEventById }