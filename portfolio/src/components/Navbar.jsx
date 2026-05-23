import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { INFO, NAV_LINKS } from '../data/info'
import ThemeToggle from './ThemeToggle'
import BackButton from './BackButton'
import CVDownloadButton from './CVDownloadButton'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const { pathname } = useLocation()
  const { theme }    = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const navbarBg = scrolled
    ? isDark
      ? 'bg-[#03030c]/92 backdrop-blur-2xl border-b border-[rgba(0,229,255,0.10)] shadow-[0_2px_20px_rgba(0,0,0,0.4)]'
      : 'bg-[#f0f6ff]/93 backdrop-blur-2xl border-b border-[rgba(37,99,235,0.14)] shadow-[0_2px_16px_rgba(37,99,235,0.08)]'
    : 'bg-transparent border-b border-transparent'

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 h-16 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${navbarBg}`}>

        {/* Left: back button */}
        <div className="w-20 flex items-center shrink-0">
          <BackButton />
        </div>

        {/* Center: desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `relative font-['Syne'] text-sm font-semibold px-4 py-1.5 rounded-lg
                 transition-all duration-200 tracking-wide
                 ${isActive
                   ? isDark ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.09)]' : 'text-[#2563eb] bg-[rgba(37,99,235,0.09)]'
                   : isDark ? 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]' : 'text-slate-600 hover:text-slate-900 hover:bg-black/[0.04]'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                                     ${isDark ? 'bg-[#00e5ff]' : 'bg-[#2563eb]'}`} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <NavLink to="/cv"
            className={({ isActive }) =>
              `hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
               font-['Syne'] font-semibold text-[0.78rem] border transition-all duration-200 hover:-translate-y-0.5
               ${isActive
                 ? isDark ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.09)] border-[rgba(0,229,255,0.3)]' : 'text-[#2563eb] bg-[rgba(37,99,235,0.09)] border-[rgba(37,99,235,0.3)]'
                 : isDark ? 'text-slate-400 border-[rgba(0,229,255,0.2)] hover:text-[#00e5ff] hover:border-[rgba(0,229,255,0.35)]' : 'text-slate-600 border-[rgba(37,99,235,0.2)] hover:text-[#2563eb] hover:border-[rgba(37,99,235,0.35)] bg-white/50'
               }`
            }>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            View CV
          </NavLink>
          <a href={`mailto:${INFO.email}`}
             className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg
                         font-['Syne'] font-bold text-sm transition-all duration-200 hover:-translate-y-0.5
                         ${isDark
                           ? 'bg-[#00e5ff] text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                           : 'bg-[#2563eb] text-white hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)]'
                         }`}>
            Hire Me
          </a>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} aria-label="Toggle menu"
                  className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1">
            <span className={`block h-0.5 rounded transition-all duration-300
              ${isDark ? 'bg-[#00e5ff]' : 'bg-[#2563eb]'}
              ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
            <span className={`block h-0.5 rounded transition-all duration-300
              ${isDark ? 'bg-[#00e5ff]' : 'bg-[#2563eb]'}
              ${open ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 rounded transition-all duration-300
              ${isDark ? 'bg-[#00e5ff]' : 'bg-[#2563eb]'}
              ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className={`fixed top-16 inset-x-0 z-40 px-4 py-5 flex flex-col gap-1 animate-fade-in border-b
                         ${isDark
                           ? 'bg-[#03030c]/97 backdrop-blur-2xl border-[rgba(0,229,255,0.10)]'
                           : 'bg-[#f0f6ff]/97 backdrop-blur-2xl border-[rgba(37,99,235,0.14)]'
                         }`}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `font-['Syne'] text-base font-semibold px-4 py-3 rounded-xl transition-colors
                 ${isActive
                   ? isDark ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.09)]' : 'text-[#2563eb] bg-[rgba(37,99,235,0.09)]'
                   : isDark ? 'text-slate-200 hover:bg-white/[0.04]' : 'text-slate-700 hover:bg-black/[0.04]'
                 }`
              }
            >{label}</NavLink>
          ))}
          <div className="flex gap-2 mt-3">
            <NavLink to="/cv"
               className={({ isActive }) =>
                 `flex-1 py-2.5 rounded-xl font-['Syne'] font-bold text-sm text-center border transition-colors
                  ${isActive
                    ? isDark ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.09)] border-[rgba(0,229,255,0.3)]' : 'text-[#2563eb] bg-[rgba(37,99,235,0.09)] border-[rgba(37,99,235,0.3)]'
                    : isDark ? 'text-slate-300 border-[rgba(255,255,255,0.12)]' : 'text-slate-700 border-[rgba(37,99,235,0.2)]'
                  }`
               }>
              View CV
            </NavLink>
            <a href={`mailto:${INFO.email}`}
               className={`flex-1 py-2.5 rounded-xl font-['Syne'] font-bold text-sm text-center
                           ${isDark ? 'bg-[#00e5ff] text-black' : 'bg-[#2563eb] text-white'}`}>
              Hire Me
            </a>
          </div>
        </div>
      )}
    </>
  )
}