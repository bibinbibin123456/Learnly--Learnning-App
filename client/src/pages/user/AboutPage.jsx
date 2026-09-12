import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <div className="soft-grid">
      <section className="page-wrap grid min-h-[65vh] items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">A different kind of classroom</p>
          <h1 className="display-font mt-4 text-5xl leading-none text-[#17243d] sm:text-7xl">Make room for <em className="text-[#ff765b]">curiosity.</em></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#617087]">Learnly is a small, focused learning space for people who would rather make progress than chase perfection.</p>
          <button className="btn mt-8 rounded-xl border-0 bg-[#17243d] text-white shadow-[4px_4px_0_#ff765b] hover:bg-[#ff765b]" onClick={() => navigate('/courses')}>See the course library <span>↗</span></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[2rem] bg-[#ff765b] p-6 text-white sm:p-8"><p className="text-5xl font-black">01</p><p className="mt-12 text-sm font-bold uppercase tracking-wider text-white/70">Choose a course</p></div>
          <div className="mt-12 rounded-[2rem] bg-[#dff3eb] p-6 sm:p-8"><p className="text-5xl font-black text-[#17243d]">02</p><p className="mt-12 text-sm font-bold uppercase tracking-wider text-[#617087]">Practice as you learn</p></div>
          <div className="col-span-2 rounded-[2rem] bg-[#17243d] p-6 text-white sm:p-8"><p className="max-w-md text-2xl font-bold leading-snug sm:text-3xl">“The best learning experience is the one you can actually fit into your life.”</p><p className="mt-6 text-sm text-white/50">The Learnly principle</p></div>
        </div>
      </section>
      <section className="bg-white"><div className="page-wrap grid gap-8 py-16 sm:grid-cols-3"><div><p className="text-4xl">✦</p><h2 className="mt-5 text-xl font-black">Useful over flashy</h2><p className="mt-2 text-sm leading-6 text-[#617087]">Every course ends with something you can use, share, or build on.</p></div><div><p className="text-4xl">↗</p><h2 className="mt-5 text-xl font-black">Progress over pressure</h2><p className="mt-2 text-sm leading-6 text-[#617087]">A steady rhythm beats a heroic weekend every time.</p></div><div><p className="text-4xl">♡</p><h2 className="mt-5 text-xl font-black">People first</h2><p className="mt-2 text-sm leading-6 text-[#617087]">Clear teaching, honest examples, and room to ask questions.</p></div></div></section>
    </div>
  )
}