import React from 'react'
import { FiArrowUpRight, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#17243d] text-[#f7f8f4]">
      <div className="page-wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff765b] font-black text-white">L</span><strong className="text-xl">Learnly</strong></div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Small lessons, useful skills, and a little more confidence every week.</p>
          <div className="mt-6 flex gap-3 text-xl text-white/60"><FiInstagram /><FiTwitter /><FiMail /></div>
        </div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb09f]">Explore</p><div className="grid gap-3 text-sm text-white/65"><a href="/courses">All courses</a><a href="/about">Our approach</a><a href="/login">Your account</a></div></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb09f]">Company</p><div className="grid gap-3 text-sm text-white/65"><a href="/about">About us</a><a href="mailto:hello@learnly.test">Contact</a><a href="/">Journal</a></div></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb09f]">Stay curious</p><p className="mb-4 text-sm leading-6 text-white/60">A short note when we publish a new course or learning guide.</p><div className="flex flex-col gap-2 min-[380px]:flex-row"><input className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Your email" type="email" /><button className="rounded-xl bg-[#ff765b] px-4 py-3 text-sm font-bold text-white">Join <FiArrowUpRight className="inline" /></button></div></div>
      </div>
      <div className="border-t border-white/10"><div className="page-wrap flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Learnly Studio</span><span>Learn at your own pace.</span></div></div>
    </footer>
  )
}

export default Footer