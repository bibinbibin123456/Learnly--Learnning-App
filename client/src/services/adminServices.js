import { axiosInstance } from '../axios/axiosInstance'

export const adminLogin = (data) => axiosInstance.post('/admin/login', data)
export const adminLogout = () => axiosInstance.post('/admin/logout')
export const listAdminCourses = () => axiosInstance.get('/course/listcourses')

export const createCourse = (data) => axiosInstance.post('/course/create', data)
export const updateCourse = (courseId, data) => axiosInstance.put(`/course/update/${courseId}`, data)
export const deleteCourse = (courseId) => axiosInstance.delete(`/course/delete/${courseId}`)
