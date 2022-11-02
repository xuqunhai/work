import axios from 'axios'

const service = axios.create({
  // DEV: https://api.imooc-front.lgdsunday.club/api
  // PROD: https://api.imooc-front.lgdsunday.club/prod-api
  // baseURL: import.meta.env.VITE_BASE_API,
  baseURL: 'https://api.imooc-front.lgdsunday.club/api',
  timeout: 5000
})

export default service
