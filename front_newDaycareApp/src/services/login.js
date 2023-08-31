import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login' 
// const baseUrl = '/api/login'

const login = async (cred) => {
	console.log(cred)
	const response = await axios.post(baseUrl, cred)
	console.log(response.data)
	return response.data
}

export default { login }