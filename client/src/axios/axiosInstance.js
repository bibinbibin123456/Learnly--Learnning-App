import axios from 'axios'
const url = 'https://learnly-learningapp-backend.vercel.app/api/v1'

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