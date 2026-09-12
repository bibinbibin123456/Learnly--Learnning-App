import {createBrowserRouter} from  "react-router-dom"
import { HomePage } from "../pages/user/HomePage"
import { Userlayot } from "../layout/Userlayot"
import { AboutPage } from "../pages/user/AboutPage"
import { CoursePage } from "../pages/user/CoursePage"
import { LoginPage } from "../pages/shared.jsx/LoginPage"
import { SignupPage } from "../pages/user/SignupPage"
import CartPage from "../pages/CartPage"
import { PaymentResultPage } from "../pages/shared.jsx/PaymentResultPage"
import AdminLoginPage from "../pages/admin/AdminLoginPage"
import AdminDashboard from "../pages/admin/AdminDashboard"




export const router= createBrowserRouter([
    {
        path:'/',
        element:<Userlayot/>,
        errorElement:<h1>error page</h1>,
        children:[
             {
            path:"/",
            element:<HomePage/>
            },
            {
            path:"about",
            element:<AboutPage/>
            },
            {
            path:"courses",
            element:<CoursePage/>
            },
            {
            path:"cart",
            element:<CartPage/>
            },
             {
            path:"login",
            element:<LoginPage/>
            },
             {
            path:"signup",
            element:<SignupPage/>
            },
            {
            path:"payment/success",
            element:<PaymentResultPage/>
            },
            {
            path:"payment/failed",
            element:<PaymentResultPage/>
            }
        ]
    }
    ,{
        path:"/admin/login",
        element:<AdminLoginPage/>
    },
    {
        path:"/admin/dashboard",
        element:<AdminDashboard/>
    }
])