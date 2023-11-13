import axios from 'axios'
const baseUrl =  'http://localhost:3001/api/workers' 
// const baseUrl = '/api/workers'
let token = null
const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}

const getWorkerById = async (worker) => {
	const response = await axios.get(baseUrl.concat('/').concat(worker.id))
	return response.data
}

const editUser = async (worker, id) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.put(baseUrl.concat('/').concat(id), worker, config)
	return response.data
}
export default { getAll, getWorkerById, editUser, setToken }