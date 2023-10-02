import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/caretimes'  
// const baseUrl = '/api/children'
// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAllCaretimes = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}


const createCaretime = async newObject => {
	console.log('caretimes service')
	const config = {
		headers: { Authorization: token },
	}
	console.log(config)
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
    
}


export default { getAllCaretimes, createCaretime, setToken }