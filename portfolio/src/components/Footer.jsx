import { NavLink, useNavigate } from 'react-router-dom'
import CVDownloadButton from './CVDownloadButton'
import { INFO } from '../data/info'
import { useTheme } from '../context/ThemeContext'

const SOCIAL = [
  { label: 'GitHub',   href: INFO.github,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg> },
  { label: 'LinkedIn', href: INFO.linkedin,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg> },
  { label: 'Email',    href: `mailto:${INFO.email}`,
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg> },
]

const PAGES = [
  { to: '/', label: 'Home' }, { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' }, { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const navigate  = useNavigate()

  return (
    <footer className={`border-t px-4 sm:px-6 pt-12 pb-8 transition-colors duration-300
                       ${isDark ? 'border-[rgba(0,229,255,0.10)] bg-[#03030c]' : 'border-[rgba(99,102,241,0.15)] bg-[#f0f4ff]'}`}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand/About */}
          <div>
            <p className={`font-['Syne'] font-extrabold text-lg mb-1 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              Ansh Chauhan
            </p>
            <p className={`text-sm mb-1 ${isDark ? 'text-[#00e5ff]' : 'text-[#4f46e5]'}`}>
              AI/GenAI Engineer & Full Stack Dev
            </p>
            <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Building intelligent systems, one commit at a time.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200
                    ${isDark
                      ? 'border-[rgba(255,255,255,0.08)] text-slate-500 hover:text-[#00e5ff] hover:border-[rgba(0,229,255,0.3)]'
                      : 'border-[rgba(0,0,0,0.1)] text-slate-400 hover:text-[#4f46e5] hover:border-[rgba(79,70,229,0.3)]'
                    }`}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className={`font-['Syne'] font-semibold text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Pages
            </p>
            <div className="flex flex-col gap-2.5">
              {PAGES.map(({ to, label }) => (
                <NavLink key={to} to={to} end={to === '/'}
                  className={`text-sm transition-colors duration-200 w-fit
                    ${isDark ? 'text-slate-500 hover:text-[#00e5ff]' : 'text-slate-500 hover:text-[#4f46e5]'}`}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className={`font-['Syne'] font-semibold text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Contact
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              {[
                { href: `mailto:${INFO.email}`, label: INFO.email },
                { href: `tel:+919899609856`, label: INFO.phone },
                { href: INFO.github, label: 'github.com/Ansh0864', external: true },
                { href: INFO.linkedin, label: 'LinkedIn Profile', external: true },
              ].map(({ href, label, external }) => (
                <a key={label} href={href}
                   target={external ? '_blank' : '_self'}
                   rel="noopener noreferrer"
                   className={`transition-colors duration-200 break-all
                     ${isDark ? 'text-slate-500 hover:text-[#00e5ff]' : 'text-slate-500 hover:text-[#4f46e5]'}`}>
                  {label}
                </a>
              ))}

              {/* CV Download */}
              <CVDownloadButton variant="ghost" label="Download CV" className="mt-1 !px-0 !py-0 !text-xs" />
            </div>
          </div>
        </div>

        <div className={`h-px mb-6 ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`font-mono text-xs ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Ansh Chauhan
          </p>
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-1.5 text-xs font-mono transition-colors duration-200
              ${isDark ? 'text-slate-600 hover:text-[#00e5ff]' : 'text-slate-400 hover:text-[#4f46e5]'}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5"/><polyline points="12 5 5 12 12 19"/>
            </svg>
            Back to previous page
          </button>
        </div>
      </div>
    </footer>
  )
}