import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-[3.25rem] h-7 rounded-full border transition-all duration-300
                  focus:outline-none shrink-0
                  ${isDark
                    ? 'bg-[rgba(0,229,255,0.10)] border-[rgba(0,229,255,0.22)]'
                    : 'bg-[rgba(37,99,235,0.10)] border-[rgba(37,99,235,0.28)]'
                  } ${className}`}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[0.8rem]
                    shadow-md transition-all duration-300
                    ${isDark
                      ? 'left-0.5 bg-slate-900 border border-[rgba(0,229,255,0.3)]'
                      : 'left-[calc(100%-1.625rem)] bg-white border border-blue-200'
                    }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}