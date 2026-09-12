import React from 'react'
import { DarkMode } from '../Shared/DarkMode'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../services/userServices'
import { persistor } from '../../redux/store'
import { clearUser } from '../../redux/features/userSlice'
import { IoCartSharp, IoMenu, IoClose } from "react-icons/io5";
import { useState } from 'react'

export const Header = () => {

  const userData = useSelector((state) => state.user)
  const dispatch= useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)

const handleLogout= ()=>{
  localStorage.removeItem('token')
  try {
    userLogout().then(()=>{
      persistor.purge()
      dispatch(clearUser())
      navigate('/')
    })
  } catch (error) {
    console.log(error);
    
    
  }
}

  const navigate = useNavigate()

  const goTo = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#17243d]/10 bg-[#f7f8f4]/90 backdrop-blur-xl">
      <div className="page-wrap flex h-[4.5rem] items-center justify-between gap-4">

      {/* Left side / Mobile menu */}
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-square lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <IoClose className="text-2xl" /> : <IoMenu className="text-2xl" />}
        </button>

        {/* Logo */}
        <a
          className="group flex items-center gap-2 text-left"
          onClick={() => goTo('/')}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff765b] text-lg font-black text-white shadow-[4px_4px_0_#17243d]">L</span>
          <span className="hidden sm:block"><strong className="block text-lg leading-none tracking-tight">Learnly</strong><small className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#617087]">Make progress</small></span>
        </a>
      </div>


      {/* Desktop menu */}
      <nav className="hidden items-center gap-8 text-sm font-bold text-[#617087] lg:flex">
          <button className="transition hover:text-[#ff765b]" onClick={() => goTo('/')}>Home</button>
          <button className="transition hover:text-[#ff765b]" onClick={() => goTo('/about')}>About</button>
          <button className="transition hover:text-[#ff765b]" onClick={() => goTo('/courses')}>Courses</button>
      </nav>

      {menuOpen && <nav className="absolute left-0 right-0 top-[4.5rem] border-b border-[#17243d]/10 bg-[#f7f8f4] p-4 shadow-lg lg:hidden">
        <div className="page-wrap flex flex-col gap-1 text-lg font-bold">
          <button className="rounded-xl p-3 text-left hover:bg-white" onClick={() => goTo('/')}>Home</button>
          <button className="rounded-xl p-3 text-left hover:bg-white" onClick={() => goTo('/about')}>About</button>
          <button className="rounded-xl p-3 text-left hover:bg-white" onClick={() => goTo('/courses')}>Courses</button>
        </div>
      </nav>}

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">

        <DarkMode />

        {userData.user && Object.keys (userData.user).length ?

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden text-sm font-bold text-[#17243d] sm:block">Hi, {userData.user.name}</span>
            <button className="btn btn-ghost btn-square" onClick={()=>navigate('/cart')} aria-label="Open cart"><IoCartSharp className='text-xl'/></button>
            <button className="btn btn-sm hidden border-0 bg-[#17243d] text-white hover:bg-[#ff765b] sm:inline-flex" onClick={handleLogout}>Logout</button>

          </div>

        : (

          <button
            className="btn border-0 bg-[#17243d] text-white shadow-none hover:bg-[#ff765b]"
            onClick={() => navigate('/login')}
          >
            Join Us
          </button>

        )}

      </div>

      </div>
    </header>
  )
}