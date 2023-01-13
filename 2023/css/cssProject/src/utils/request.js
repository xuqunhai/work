import axios from 'axios'

const service = axios.create({})

service.interceptors.request.use((config) => config)
service.interceptors.response.use((res) => {})

export default service
