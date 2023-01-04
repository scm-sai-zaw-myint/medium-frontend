import axios from "axios"

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api`
})
axiosClient.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`
    config.headers['Access-Control-Allow-Origin'] = `*`
    config.headers['Access-Control-Allow-Methods'] = "OPTIONS, DELETE, POST, GET, PATCH, PUT";
    return config
})
export default axiosClient