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

const getSpesificChild = async (childid) => {
	const config = {
		headers: { Authorization: token },
	}
	const response =  await axios.get(baseUrl.concat('/').concat(childid), config)
	return response.data
}

const create = async newObject => {
	console.log('children.js')
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const addCaretime = async (newObject, childid) => {
	console.log('children.js')
	const config = {
		headers: { Authorization: token },
	}
	console.log(config)
	const response = await axios.post(baseUrl.concat('/').concat(childid).concat('/caretimes'), newObject, config)
	return response.data
}





export default { getAll, create,  getSpesificChild, addCaretime, setToken }