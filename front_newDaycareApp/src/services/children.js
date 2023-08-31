import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/children'  
// const baseUrl = '/api/children'
let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}
const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newObject => {
	console.log('children.js')
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}




export default { getAll, create,  setToken }