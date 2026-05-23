import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function BackButton({ className = '' }) {
  const navigate  = useNavigate()
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const isDark    = theme === 'dark'

  // Don't show on home page
  if (pathname === '/') return null

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-all duration-200 group ${className}
                  ${isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-black/[0.05]'
                  }`}
    >
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        className="group-hover:-translate-x-0.5 transition-transform duration-200"
      >
        <path d="M19 12H5"/><polyline points="12 5 5 12 12 19"/>
      </svg>
      Back
    </button>
  )
}