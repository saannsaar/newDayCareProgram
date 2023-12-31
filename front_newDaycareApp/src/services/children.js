import axios from 'axios'
const baseUrl = '/api/children'
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
	console.log(childid)
	const response =  await axios.get(baseUrl.concat('/').concat(childid), config)
	return response.data
}

const create = async newObject => {

	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const addCaretime = async (newObject, childid) => {

	const config = {
		headers: { Authorization: token },
	}
	console.log(config)
	const response = await axios.post(baseUrl.concat('/').concat(childid).concat('/caretimes'), newObject, config)
	return response.data
}

const editCaretime = async (caretime, childid) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.put(baseUrl.concat('/').concat(childid).concat('/caretimes'), caretime, config)
	return response.data
}


const editChild = async (kid) => {
	const config = {
		headers: { Authorization: token },
	}
	console.log(kid.id)
	console.log(kid)
	const response = await axios.put(baseUrl.concat('/').concat(kid.id), kid, config)
	return response.data
}

const deleteCaretime = async (caretimeid, childid) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.delete(baseUrl.concat('/').concat(childid).concat('/caretimes/').concat(caretimeid._id), config)
	return response.data
}




export default { getAll, create,  getSpesificChild, editChild, addCaretime, setToken, editCaretime, deleteCaretime }