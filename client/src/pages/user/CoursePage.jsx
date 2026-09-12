import React, { useEffect, useState } from 'react'
import { Card } from '../../componenets/user/Card'
import { listCourses } from '../../services/userServices'

export const CoursePage = () => {
  const [courses,setCourses]= useState([])

  useEffect(()=>{
    listCourses().then((res)=>{
      console.log(res);
      setCourses(res.data)
    }).catch((err)=>console.log(err))
  },[])
  return (
    <div className="page-wrap py-12 sm:py-16">
      <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#17243d]/10 pb-8 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff765b]">The library</p><h1 className="display-font mt-2 text-5xl text-[#17243d] sm:text-6xl">Find your next skill.</h1><p className="mt-3 max-w-lg text-[#617087]">Short, practical courses designed to move you from “I should” to “I can.”</p></div><span className="rounded-full bg-[#17243d] px-4 py-2 text-sm font-bold text-white">{courses.length} courses</span></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{courses?.map((course,i)=><Card key={course._id || i} course={course}/>)}</div>
      {!courses.length && <div className="rounded-3xl border border-dashed border-[#17243d]/20 p-12 text-center text-[#617087]">Courses are loading. Check back in a moment.</div>}
    </div>
  )
}
