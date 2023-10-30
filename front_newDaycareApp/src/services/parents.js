import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/parents' 
// const baseUrl = '/api/parents'

let token = null

const setToken = newToken => {
	console.log('Set token servicesss!!!!!!!!!!')
	token = `bearer ${newToken}`
}

const getAllParents = async () => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}

const getParentById = async (user) => {
	const config = {
		headers: { Authorization: token },
	}
	console.log('SERVICE getParentById -- ', user)
	console.log(token)
	const response = await axios.get(baseUrl.concat('/').concat(user.id), config)
	console.log(response)
	return response.data
}

const editParentUser = async (user, id) => {
	const config = {
		headers: { Authorization: token },
	}
	console.log('Service editParentUser -- ', user)
	const response = await axios.put(baseUrl.concat('/').concat(id), user, config)
	console.log(response.data)
	return response.data
}
export default { getAllParents, getParentById, editParentUser, setToken }