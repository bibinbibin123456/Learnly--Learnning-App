import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLogin } from '../../services/adminServices'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const updateValue = (event) => {
    setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await adminLogin(values)
      toast.success('Admin login successful')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="soft-grid flex min-h-screen items-center justify-center px-4 py-12">
      <form className="w-full max-w-md rounded-[2rem] border border-[#17243d]/10 bg-white p-7 shadow-[10px_10px_0_#9bdac5] sm:p-10" onSubmit={onSubmit}>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">Learnly administration</p>
        <h1 className="display-font mt-3 text-5xl text-[#17243d]">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-[#617087]">Sign in to manage the course library.</p>
        <div className="mt-8 grid gap-4">
          <label className="text-sm font-bold text-[#17243d]">Email
            <input className="input mt-2 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="email" type="email" value={values.email} onChange={updateValue} required />
          </label>
          <label className="text-sm font-bold text-[#17243d]">Password
            <input className="input mt-2 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="password" type="password" value={values.password} onChange={updateValue} required />
          </label>
          <button className="btn mt-3 rounded-xl border-0 bg-[#17243d] text-white hover:bg-[#ff765b]" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </main>
  )
}
