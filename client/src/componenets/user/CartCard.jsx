import React, { useState } from 'react'

export default function CartCard({ item, onRemove }) {
  const course = item?.courseId || {}
  const courseId = item?.courseId?._id || item?.courseId || course?._id
  const price = Number(item?.price ?? course?.price ?? 0)
  const [imageFailed, setImageFailed] = useState(!course.image)

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#17243d]/10 bg-[#f7f8f4] transition hover:border-[#ff765b]/40">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-4">
          <figure className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-[#dff3eb] shadow-inner sm:h-24 sm:w-24">
            {imageFailed ? (
              <span className="text-xl font-black text-[#17243d]">{course.title?.slice(0, 1) || 'L'}</span>
            ) : (
              <img
                src={course.image}
                alt={course.title || 'Cart item'}
                onError={() => setImageFailed(true)}
                className="h-full w-full object-contain"
              />
            )}
          </figure>

          <div className="min-w-0">
            <p className="truncate text-lg font-black text-[#17243d]">{course.title || 'Course'}</p>
            <p className="mt-1 text-sm font-bold text-[#617087]">₹{price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <button
          className="btn btn-sm w-full rounded-xl border-0 bg-[#17243d] text-white shadow-none hover:bg-[#ff765b] sm:w-auto"
          onClick={() => onRemove?.(courseId ? String(courseId) : undefined)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
