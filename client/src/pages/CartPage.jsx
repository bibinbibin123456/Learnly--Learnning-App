import React, { useEffect, useState } from 'react'
import CartCard from '../componenets/user/CartCard'
import { getCartItems, makePaymentOnStripe, removeFromCart } from '../services/userServices'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const makePayment = async () => {
    if (!courses.length) return

    try {
      const response = await makePaymentOnStripe({ products: courses })
      const checkoutUrl = response.data.checkoutUrl

      if (!checkoutUrl) {
        throw new Error('Stripe checkout URL was not returned')
      }

      window.location.assign(checkoutUrl)
    } catch (error) {
      console.log(error)
    }

  }

  const fetchCart = () => {
    setLoading(true)
    setError('')
    getCartItems()
      .then((res) => {
        setCart(res.data || null)
      })
      .catch((err) => {
        console.log(err)
        setCart(null)
        setError(err.response?.status === 401
          ? 'Please log in again to view your cart.'
          : 'We could not load your cart. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleRemove = (courseId) => {
    if (!courseId) return

    removeFromCart(courseId)
      .then(() => {
        fetchCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const courses = cart?.courses || []
  const totalPrice = cart?.totalPrice ?? courses.reduce((sum, item) => sum + Number(item.price || item.courseId?.price || 0), 0)

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <div className="text-lg font-medium text-slate-600">Loading cart...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-lg font-medium text-slate-600">{error}</div>
        <button className="btn rounded-xl border-0 bg-[#ff765b] text-white hover:bg-[#e65d44]" onClick={fetchCart}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="page-wrap py-10 sm:py-16">
      <div className="mb-10"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">Your learning shelf</p><h1 className="display-font mt-2 text-5xl text-[#17243d] sm:text-6xl">A good place to start.</h1><p className="mt-3 max-w-xl text-[#617087]">Keep the courses that caught your eye close by. You can check out whenever you are ready.</p></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <section className="rounded-[2rem] border border-[#17243d]/10 bg-white p-4 shadow-[0_12px_35px_rgba(23,36,61,0.06)] sm:p-7">
        <div className="mb-6 flex flex-col gap-2 border-b border-[#17243d]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#617087]">Saved for later</p>
            <h2 className="mt-1 text-2xl font-black text-[#17243d] sm:text-3xl">Your courses</h2>
          </div>
          <div className="w-fit rounded-full bg-[#dff3eb] px-3 py-2 text-sm font-bold text-[#276c59]">
            {courses.length} item{courses.length !== 1 ? 's' : ''}
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#17243d]/20 bg-[#f7f8f4] p-8 text-center">
            <p className="text-xl font-black text-[#17243d]">Your shelf is waiting.</p>
            <p className="mt-2 text-sm text-[#617087]">Find a course that makes you curious.</p>
            <button className="btn mt-5 rounded-xl border-0 bg-[#ff765b] text-white hover:bg-[#e65d44]" onClick={() => navigate('/courses')}>
              Get Courses
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((item, index) => (
              <CartCard
                key={item._id || item.courseId?._id || index}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </section>
      <aside className="rounded-[2rem] bg-[#17243d] p-6 text-white shadow-[8px_8px_0_#9bdac5] sm:p-7 lg:sticky lg:top-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9bdac5]">Order summary</p><div className="mt-7 flex items-end justify-between border-b border-white/15 pb-5"><span className="text-white/60">{courses.length} course{courses.length !== 1 ? 's' : ''}</span><strong className="text-3xl">₹{Number(totalPrice).toLocaleString('en-IN')}</strong></div>
        <p className="mt-5 text-sm leading-6 text-white/55">Instant access after payment. Learn at your own pace, on any device.</p><button className="btn mt-7 h-13 w-full rounded-xl border-0 bg-[#ff765b] text-white shadow-none hover:bg-[#e65d44]" onClick={makePayment} disabled={!courses.length}>Continue to checkout <span>↗</span></button>
      </aside>
      </div>
    </div>
  )
}
