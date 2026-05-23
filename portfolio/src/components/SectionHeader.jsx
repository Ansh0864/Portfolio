import { useTheme } from '../context/ThemeContext'

export default function SectionHeader({ label, title, subtitle, center = false }) {
  const { theme } = useTheme()
  const isDark    = theme === 'dark'

  return (
    <div className={center ? 'text-center' : ''}>
      <span className={`inline-block font-mono text-[0.7rem] tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full
                       ${isDark
                         ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)]'
                         : 'text-[#4f46e5] bg-[rgba(79,70,229,0.08)] border border-[rgba(79,70,229,0.18)]'
                       }`}>
        {label}
      </span>
      <h2 className={`font-['Syne'] font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-3
                     ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`leading-relaxed text-[1rem] ${center ? 'mx-auto' : ''} max-w-[540px]
                      ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}