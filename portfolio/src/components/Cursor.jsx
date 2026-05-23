import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot   = useRef(null)
  const ring  = useRef(null)

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf

    const move = e => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dot.current) {
        dot.current.style.left = mouseX + 'px'
        dot.current.style.top  = mouseY + 'px'
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ring.current) {
        ring.current.style.left = ringX + 'px'
        ring.current.style.top  = ringY + 'px'
      }
      raf = requestAnimationFrame(animate)
    }

    // grow ring on hovering interactive elements
    const grow   = () => ring.current?.classList.add('ring-grow')
    const shrink = () => ring.current?.classList.remove('ring-grow')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s;
        }
        .cursor-dot {
          width: 6px; height: 6px;
          background: #00e5ff;
          box-shadow: 0 0 8px rgba(0,229,255,0.8);
        }
        .cursor-ring {
          width: 32px; height: 32px;
          border: 1.5px solid rgba(0,229,255,0.55);
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .cursor-ring.ring-grow {
          width: 52px; height: 52px;
          border-color: rgba(0,229,255,0.9);
          background: rgba(0,229,255,0.06);
        }
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}