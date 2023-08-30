import axios from 'axios'
// const baseUrl =  'http://localhost:3001/api/workers' 
const baseUrl = '/api/workers'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

export default { getAll }