import axios from 'axios'

const apiURL = 'http://localhost:8888'

const api = axios.create({
 baseURL: apiURL
})

export default api