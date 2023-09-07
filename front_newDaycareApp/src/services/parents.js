import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/parents' 
// const baseUrl = '/api/parents'

const getAllParents = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getParentById = async (user) => {
	console.log('SERVICE PARENT', user)
	const response = await axios.get(baseUrl.concat('/').concat(user.id))
	return response.data
}

const editParentUser = async (user, id) => {
	console.log('Service edit', user)
	const response = await axios.put(baseUrl.concat('/').concat(id), user)
	console.log(response.data)
	return response.data
}
export default { getAllParents, getParentById, editParentUser }