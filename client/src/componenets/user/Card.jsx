import { useState } from "react";
import { FiArrowUpRight, FiClock, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../../services/userServices";

const courseImageFallbacks = {
  mern: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=90',
  python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=90',
  data: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=90'
}

const getFallbackImage = (title = '') => {
  const normalizedTitle = title.toLowerCase()
  if (normalizedTitle.includes('python')) return courseImageFallbacks.python
  if (normalizedTitle.includes('data') || normalizedTitle.includes('analyst')) return courseImageFallbacks.data
  if (normalizedTitle.includes('mern') || normalizedTitle.includes('web')) return courseImageFallbacks.mern
  return courseImageFallbacks.mern
}

const isCuratedCourse = (title = '') => {
  const normalizedTitle = title.toLowerCase()
  return normalizedTitle.includes('mern') || normalizedTitle.includes('web') || normalizedTitle.includes('python') || normalizedTitle.includes('data') || normalizedTitle.includes('analyst')
}

export const Card = ({ course }) => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.user)
  const fallbackImage = getFallbackImage(course.title)
  const preferredImage = isCuratedCourse(course.title) ? fallbackImage : (course.image || fallbackImage)
  const [imageSource, setImageSource] = useState(preferredImage)
  const [imageFailed, setImageFailed] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const category = course.title?.toLowerCase().includes('python')
    ? 'Programming'
    : course.title?.toLowerCase().includes('data') || course.title?.toLowerCase().includes('analyst')
      ? 'Data & analytics'
      : 'Web development'
  const addCourseToCart = (courseId) => {
    const isLoggedIn = Boolean(localStorage.getItem('token')) && Boolean(userData.user && Object.keys(userData.user).length)

    if (!isLoggedIn) {
      toast.info('Please log in to add courses to your cart')
      navigate('/login')
      return
    }

    try {
      addToCart(courseId)
        .then((res) => {
          toast.success(res.data.message || "Course added to cart");
        })
        .catch((err) => {
          toast.error(err.response?.data?.error || "Something went wrong");
        });
    } catch (error) {
      toast.error("Failed to add course to cart");
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#17243d]/10 bg-white shadow-[0_12px_35px_rgba(23,36,61,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#ff765b]/40 hover:shadow-[0_20px_45px_rgba(23,36,61,0.13)]">

      <figure className="relative aspect-[16/9] w-full overflow-hidden bg-[#dff3eb]">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1d4140] to-[#17243d] p-5 text-center text-white">
            <span className="text-4xl font-black">{course.title?.slice(0, 1) || 'L'}</span>
            <span className="mt-2 text-sm font-bold">{course.title || 'Course'}</span>
          </div>
        ) : (
          <img
            src={imageSource}
            alt={course.title}
            onError={() => {
              if (imageSource !== fallbackImage) setImageSource(fallbackImage)
              else setImageFailed(true)
            }}
            className="h-full w-full object-cover transition duration-300"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#17243d] backdrop-blur-sm">{category}</span>
      </figure>

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-black tracking-tight text-[#17243d] sm:text-2xl">
          {course.title}
          </h2>
          <span className="shrink-0 rounded-lg bg-[#fff0eb] px-2 py-1 text-xs font-black text-[#d94d35]">Course</span>
        </div>

        <p className={`${expanded ? '' : 'line-clamp-3'} mt-2 whitespace-normal break-words text-sm leading-6 text-[#617087] sm:text-base`}>
          {course.description}
        </p>

        {course.description?.length > 150 && (
          <button
            type="button"
            className="mt-2 inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-lg font-black leading-none text-[#ff765b] hover:bg-[#ff765b]/10"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less description' : 'Show full description'}
            title={expanded ? 'Show less' : 'Show full description'}
          >
            ...
          </button>
        )}

        <div className="mt-auto flex flex-col gap-4 border-t border-[#17243d]/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-2xl font-black tracking-tight text-[#17243d]">₹{Number(course.price).toLocaleString('en-IN')}</p>{course.duration && <p className="mt-1 flex items-center gap-1 text-xs font-bold text-[#617087]"><FiClock /> {course.duration}</p>}</div>
          <button
            className="btn h-11 w-full rounded-xl border-0 bg-[#17243d] text-white shadow-none hover:bg-[#ff765b] sm:w-auto"
            onClick={() => addCourseToCart(course._id)}
          >
            <FiShoppingBag /> Add to cart <FiArrowUpRight />
          </button>
        </div>

      </div>
    </article>
  );
};