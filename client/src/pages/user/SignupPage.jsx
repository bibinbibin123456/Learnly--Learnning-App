import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { userSignUp } from '../../services/userServices'
import { toast } from 'react-toastify'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[6-9]\d{9}$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

export const SignupPage = () => {
  const [values, setValues] = useState({ name: '', email: '', phone: '', password: '', confirmpassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const updateValue = (event) => setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    if (values.password !== values.confirmpassword) {
      toast.error('Passwords do not match', { position: 'top-center' })
      return
    }
    if (!emailPattern.test(values.email)) {
      toast.error('Enter a valid email address', { position: 'top-center' })
      return
    }
    if (!phonePattern.test(values.phone)) {
      toast.error('Phone number must be 10 digits and start with 6-9', { position: 'top-center' })
      return
    }
    if (!passwordPattern.test(values.password)) {
      toast.error('Password needs 8 characters, uppercase, lowercase, number, and special character', { position: 'top-center' })
      return
    }
    userSignUp(values).then(() => {
      toast.success('Signup successful', { position: 'top-center' })
      navigate('/')
    }).catch((error) => {
      toast.error(error?.response?.data?.error || 'Something went wrong', { position: 'top-center' })
    })
  }

  return (
    <div className="soft-grid min-h-[calc(100vh-4.5rem)] px-4 py-12 sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="text-center lg:text-left"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">Start small, go far</p><h1 className="display-font mt-3 text-5xl leading-none text-[#17243d] sm:text-6xl">Make a little space for learning.</h1><p className="mt-6 max-w-md leading-7 text-[#617087]">Join a growing community building useful skills one focused lesson at a time.</p></div>
        <div className="w-full rounded-[2rem] border border-[#17243d]/10 bg-white shadow-[10px_10px_0_#9bdac5]"><form className="grid gap-4 p-6 sm:p-8" onSubmit={onSubmit}><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#17243d]">Name<input className="input mt-2 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="name" onChange={updateValue} required /></label><label className="text-sm font-bold text-[#17243d]">Phone<input className="input mt-2 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength="10" onChange={updateValue} required /></label></div><label className="text-sm font-bold text-[#17243d]">Email<input className="input mt-2 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="email" type="email" onChange={updateValue} required /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#17243d]">Password<div className="relative mt-2"><input className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4] pr-11" name="password" type={showPassword ? 'text' : 'password'} minLength="8" onChange={updateValue} required /><button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-square" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></div></label><label className="text-sm font-bold text-[#17243d]">Confirm<div className="relative mt-2"><input className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4] pr-11" name="confirmpassword" type={showConfirmPassword ? 'text' : 'password'} minLength="8" onChange={updateValue} required /><button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-square" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}>{showConfirmPassword ? <FiEyeOff /> : <FiEye />}</button></div></label></div><button className="btn mt-3 rounded-xl border-0 bg-[#ff765b] text-white hover:bg-[#e65d44]" type="submit">Create account <span>↗</span></button><p className="text-center text-sm text-[#617087]">Already learning here? <Link className="font-bold text-[#ff765b]" to="/login">Log in</Link></p></form></div>
      </div>
    </div>
  )
}