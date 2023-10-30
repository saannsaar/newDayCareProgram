import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/groups'  
// const baseUrl = '/api/children'
let token = null

const setToken = newToken => {
	
	token = `bearer ${newToken}`
}
const getAllGroups = async () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const createGroup = async newObject => {
	console.log('group.js')
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const updateGroup = async (group) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.put(baseUrl.concat('/').concat(group.id), group, config)
	console.log(response.data)
	return response.data
}



export default { getAllGroups, createGroup,  setToken, updateGroup }