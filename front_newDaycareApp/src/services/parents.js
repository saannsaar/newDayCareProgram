import axios from 'axios'
const baseUrl = '/api/parents'

let token = null

const setToken = newToken => {
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
	const response = await axios.get(baseUrl.concat('/').concat(user.id), config)
	return response.data
}

const editParentUser = async (user, id) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.put(baseUrl.concat('/').concat(id), user, config)
	return response.data
}
export default { getAllParents, getParentById, editParentUser, setToken }