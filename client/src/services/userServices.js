import { data } from "react-router-dom"
import { axiosInstance } from "../axios/axiosInstance"

 export const listCourses=()=>{
    return axiosInstance.get("/course/listcourses")

}

export const userSignUp=(data)=>{
    return axiosInstance.post("/user/register",data)
}

export const userLogin=(data)=>{
    return axiosInstance.post("/user/login",data)
}

export const userLogout=(data)=>{
    return axiosInstance.post("/user/logout")
}
export const addToCart=(courseId)=>{
    return axiosInstance.post(`/cart/addtocart/${courseId}`)
}
export const getCartItems=()=>{
    return axiosInstance.get(`/cart/getcart`)
}

export const removeFromCart=(courseId)=>{
    return axiosInstance.delete(`/cart/remove/${courseId}`)
}

export const makePaymentOnStripe=(body)=>{
    return axiosInstance.post(`/payment/makepayment`,body)
}

