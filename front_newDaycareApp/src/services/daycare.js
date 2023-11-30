import axios from 'axios' 
const baseUrl = '/api/daycare'

const getDaycare = async (worker) => {
	const response = await axios.get(baseUrl.concat('/').concat(worker.daycare))
	return response.data
}




export default { getDaycare, }