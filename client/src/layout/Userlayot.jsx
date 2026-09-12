import React from 'react'
import { Header } from '../componenets/user/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../componenets/user/Footer'

export const Userlayot = () => {
  return (
    <div className='flex min-h-screen flex-col'>
        <Header/>
      <main className='flex-grow'>
            <Outlet/>
      </main>
        <Footer/>
    </div>
  )
}
