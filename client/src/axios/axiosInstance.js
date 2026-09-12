import axios from 'axios'
const url= import.meta.env.VITE_BASE_URL
console.log(url,"baseurl")

const axiosInstance= axios.create({
    baseURL: url,
    withCredentials:true,
    timeout: 10000
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export {axiosInstance}