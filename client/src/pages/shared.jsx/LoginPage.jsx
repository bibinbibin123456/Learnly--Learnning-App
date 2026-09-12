
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../services/userServices'
import { toast } from 'react-toastify'
import {useDispatch} from 'react-redux'
import { saveUser } from '../../redux/features/userSlice'

export const LoginPage = () => {

  const navigate = useNavigate()
  const dispatch= useDispatch()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await userLogin(values)

      console.log(res)

      if (res.data.success) {

        // Save token in localStorage
        localStorage.setItem('token', res.data.token)

        // Show success message
        toast.success(res.data.message)

        dispatch(saveUser(res.data.userExit))

        // Navigate to home page
        navigate('/')

      } else {

        toast.error(res.data.message)

      }

    } catch (err) {

      console.log(err)

      toast.error(
        err.response?.data?.message || 'Login failed'
      )

    }
  }

  return (
    <div className="soft-grid min-h-[calc(100vh-4.5rem)] px-4 py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">

        <div className="hero-content flex-col lg:flex-row-reverse">

          {/* Left Content */}
          <div className="text-center lg:text-left">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">Welcome back</p>
            <h1 className="display-font mt-3 text-5xl text-[#17243d] sm:text-6xl">
              Pick up where you left off.
            </h1>

            <p className="max-w-md py-6 leading-7 text-[#617087]">
              Your next small win is closer than you think. Sign in to continue learning.
            </p>

          </div>

          {/* Login Card */}
          <div className="w-full max-w-sm rounded-[2rem] border border-[#17243d]/10 bg-white shadow-[10px_10px_0_#9bdac5]">

            <div className="p-6 sm:p-8">

              <form onSubmit={onSubmit}>

                <fieldset className="fieldset">

                  {/* Email */}
                  <label className="label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                      }))
                    }}
                  />


                  {/* Password */}
                  <label className="label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={(e) => {
                      setValues((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value
                      }))
                    }}
                  />


                  {/* Forgot Password */}
                  <div>

                    <Link
                      to="/forgot-password"
                      className="link link-hover"
                    >
                      Forgot password?
                    </Link>

                  </div>


                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn mt-4 w-full rounded-xl border-0 bg-[#ff765b] text-white hover:bg-[#e65d44]"
                  >
                    Login
                  </button>

                </fieldset>

              </form>


              {/* Signup */}
              <p className="mt-2">

                Don't have an account?{' '}

                <Link
                  to="/signup"
                  className="link link-primary"
                >
                  Sign up
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}