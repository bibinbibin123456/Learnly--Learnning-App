import React from 'react'
import { useNavigate } from 'react-router-dom'


export const HomePage = () => {
  const navigate= useNavigate()
  return (
    <div className="overflow-hidden">
      <section className="soft-grid relative">
        <div className="page-wrap grid min-h-[calc(100vh-4.5rem)] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
          <div className="fade-up max-w-2xl">
            <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#ff765b]/30 bg-[#fff0eb] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#d94d35] sm:mb-6 sm:px-4 sm:text-xs sm:tracking-[0.18em]"><span className="h-2 w-2 shrink-0 rounded-full bg-[#ff765b]" /> Learn something useful</p>
            <h1 className="display-font text-4xl leading-[0.98] text-[#17243d] sm:text-7xl">Your next <em className="text-[#ff765b]">chapter</em> starts here.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#617087] sm:text-xl">Practical courses for curious people who want to build momentum, sharpen their craft, and make work they are proud of.</p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row"><button className="btn h-14 w-full rounded-2xl border-0 bg-[#ff765b] px-7 text-base text-white shadow-[5px_5px_0_#17243d] hover:bg-[#e65d44] sm:w-auto" onClick={()=>navigate('/courses')}>Explore courses <span>↗</span></button><button className="btn h-14 w-full rounded-2xl border-2 border-[#17243d]/15 bg-transparent px-7 text-base text-[#17243d] shadow-none hover:border-[#17243d] sm:w-auto" onClick={()=>navigate('/about')}>How Learnly works</button></div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 border-t border-[#17243d]/10 pt-6 sm:mt-12 sm:gap-8"><div><strong className="text-2xl">01</strong><p className="text-xs font-bold uppercase tracking-wider text-[#617087]">Pick a course</p></div><div><strong className="text-2xl">02</strong><p className="text-xs font-bold uppercase tracking-wider text-[#617087]">Learn by doing</p></div><div><strong className="text-2xl">03</strong><p className="text-xs font-bold uppercase tracking-wider text-[#617087]">Keep building</p></div></div>
          </div>
          <div className="relative mx-auto w-full max-w-[480px] fade-up [animation-delay:120ms]">
            <div className="absolute -right-3 top-10 h-32 w-32 rounded-full bg-[#ffb09f] sm:-right-8" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-[2rem] bg-[#9bdac5]" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-[#17243d] shadow-[14px_14px_0_#17243d]">
              <img className="h-[430px] w-full object-cover opacity-90 sm:h-[540px]" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85" alt="Students learning together" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff765b]">This week’s prompt</p><p className="mt-1 font-bold text-[#17243d]">What will you make with what you know?</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-wrap grid gap-4 py-14 sm:grid-cols-3"><div className="accent-card accent-card-mint rounded-3xl bg-[#dff3eb] p-6"><span className="text-3xl">01</span><h2 className="mt-8 text-xl font-black">Learn clearly</h2><p className="mt-2 text-sm leading-6 text-[#617087]">No filler. Just friendly lessons that respect your time.</p></div><div className="accent-card accent-card-coral rounded-3xl bg-[#fff0eb] p-6"><span className="text-3xl">02</span><h2 className="mt-8 text-xl font-black">Practice often</h2><p className="mt-2 text-sm leading-6 text-[#617087]">Turn ideas into small, satisfying projects.</p></div><div className="accent-card accent-card-yellow rounded-3xl bg-[#fff5cf] p-6"><span className="text-3xl">03</span><h2 className="mt-8 text-xl font-black">Keep going</h2><p className="mt-2 text-sm leading-6 text-[#617087]">Build a rhythm that lasts beyond the first week.</p></div></section>
    </div>
  )
}
