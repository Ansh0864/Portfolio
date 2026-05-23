import { useEffect, useRef, useState } from 'react'

export default function useInView(options = { threshold: 0.12 }) {
  const ref    = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); ob.disconnect() }
    }, options)
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return [ref, inView]
}