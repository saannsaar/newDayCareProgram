import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/daycare'  
// const baseUrl = '/api/daycare'

const getDaycare = async (worker) => {
	console.log(worker.daycare)
	const response = await axios.get(baseUrl.concat('/').concat(worker.daycare))
	return response.data
}




export default { getDaycare, }