import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  adminLogout,
  createCourse,
  deleteCourse,
  listAdminCourses,
  updateCourse,
} from '../../services/adminServices'

const emptyForm = { title: '', description: '', duration: '', price: '', image: null }

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadCourses = useCallback(async () => {
    try {
      const response = await listAdminCourses()
      setCourses(response.data || [])
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login')
        return
      }
      toast.error('Could not load courses')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const updateValue = (event) => {
    const { name, value, files } = event.target
    setForm((previous) => ({ ...previous, [name]: files ? files[0] : value }))
  }

  const startEditing = (course) => {
    setEditingId(course._id)
    setForm({
      title: course.title || '',
      description: course.description || '',
      duration: course.duration || '',
      price: course.price || '',
      image: null,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!editingId && !form.image) {
      toast.error('Please select a course image')
      return
    }

    const body = new FormData()
    body.append('title', form.title)
    body.append('description', form.description)
    body.append('duration', form.duration)
    body.append('price', form.price)
    if (form.image) body.append('image', form.image)

    setSaving(true)
    try {
      if (editingId) {
        await updateCourse(editingId, body)
        toast.success('Course updated')
      } else {
        await createCourse(body)
        toast.success('Course created')
      }
      resetForm()
      await loadCourses()
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login')
        return
      }
      toast.error(error.response?.data?.error || 'Could not save course')
    } finally {
      setSaving(false)
    }
  }

  const removeCourse = async (courseId) => {
    if (!window.confirm('Delete this course?')) return

    try {
      await deleteCourse(courseId)
      toast.success('Course deleted')
      setCourses((previous) => previous.filter((course) => course._id !== courseId))
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/admin/login')
        return
      }
      toast.error(error.response?.data?.error || 'Could not delete course')
    }
  }

  const logout = async () => {
    await adminLogout().catch(() => {})
    navigate('/admin/login')
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">Learnly administration</p>
            <h1 className="display-font mt-2 text-5xl text-[#17243d]">Course library</h1>
          </div>
          <button className="btn w-fit rounded-xl border-0 bg-[#17243d] text-white hover:bg-[#ff765b]" onClick={logout}>Log out</button>
        </header>

        <section className="mb-8 rounded-[2rem] border border-[#17243d]/10 bg-white p-6 shadow-[0_12px_35px_rgba(23,36,61,0.06)] sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">{editingId ? 'Edit course' : 'New course'}</p><h2 className="mt-1 text-2xl font-black text-[#17243d]">{editingId ? 'Update course details' : 'Add a course'}</h2></div>
            {editingId && <button className="btn btn-ghost rounded-xl" onClick={resetForm}>Cancel</button>}
          </div>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
            <input className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="title" placeholder="Course title" value={form.title} onChange={updateValue} required />
            <input className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="duration" placeholder="Duration, e.g. 6 Months" value={form.duration} onChange={updateValue} required />
            <input className="input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="price" type="number" min="0" placeholder="Price" value={form.price} onChange={updateValue} required />
            <input className="file-input w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4]" name="image" type="file" accept="image/*" onChange={updateValue} required={!editingId} />
            <textarea className="textarea min-h-32 w-full rounded-xl border-[#17243d]/15 bg-[#f7f8f4] md:col-span-2" name="description" placeholder="Course description" value={form.description} onChange={updateValue} required />
            <button className="btn rounded-xl border-0 bg-[#ff765b] text-white hover:bg-[#e65d44] md:col-span-2" type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update course' : 'Create course'}</button>
          </form>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black text-[#17243d]">Existing courses</h2><span className="rounded-full bg-[#dff3eb] px-3 py-2 text-sm font-bold text-[#276c59]">{courses.length} total</span></div>
          {loading ? <p className="py-10 text-center text-[#617087]">Loading courses...</p> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => <article className="overflow-hidden rounded-2xl border border-[#17243d]/10 bg-white shadow-sm" key={course._id}>
              {course.image && <img className="aspect-video w-full object-cover" src={course.image} alt={course.title} />}
              <div className="p-5"><h3 className="text-xl font-black text-[#17243d]">{course.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-[#617087]">{course.description}</p><div className="mt-4 flex items-center justify-between"><strong className="text-lg text-[#17243d]">₹{Number(course.price).toLocaleString('en-IN')}</strong><div className="flex gap-2"><button className="btn btn-sm rounded-lg bg-[#dff3eb] text-[#276c59]" onClick={() => startEditing(course)}>Edit</button><button className="btn btn-sm rounded-lg bg-[#fff0eb] text-[#d94d35]" onClick={() => removeCourse(course._id)}>Delete</button></div></div></div>
            </article>)}
          </div>}
        </section>
      </div>
    </main>
  )
}
