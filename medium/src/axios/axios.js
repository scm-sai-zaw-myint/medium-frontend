import axios from "axios"

const axiosClient = axios.create({
    baseURL: `https://003c-103-135-217-178.ngrok-free.app/api`
})
axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    config.headers['Access-Control-Allow-Origin'] = `*`
    config.headers['Access-Control-Allow-Methods'] = "OPTIONS, DELETE, POST, GET, PATCH, PUT";
    config.headers['ngrok-skip-browser-warning'] = 'any'
    return config
})
export default axiosClient