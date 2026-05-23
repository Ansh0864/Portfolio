import { useState } from 'react'
import { PROJECTS, CATEGORIES } from '../data/projects'
import SectionHeader from '../components/SectionHeader'
import useInView from '../hooks/useInView'
import { useTheme } from '../context/ThemeContext'

/* ── Project image with gradient fallback ── */
function ProjectImage({ project: p }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="relative h-44 w-full rounded-t-2xl overflow-hidden">
      {!imgError ? (
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover object-top"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center"
             style={{ background: p.gradient }}>
          <span className="text-5xl mb-2">{p.emoji}</span>
          <span className="font-mono text-xs opacity-40" style={{ color: p.color }}>
            {p.title}
          </span>
        </div>
      )}
      {/* Overlay gradient bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Category badge on image */}
      <span className="absolute top-3 right-3 font-mono text-[0.63rem] px-2.5 py-1 rounded-full"
            style={{ color: p.color, background: 'rgba(0,0,0,0.65)', border: `1px solid ${p.color}40` }}>
        {p.category}
      </span>
    </div>
  )
}

/* ── Project Card ── */
function ProjectCard({ project: p, onOpen }) {
  const [ref, inView] = useInView()
  const [hov, setHov] = useState(false)
  const { theme }     = useTheme()
  const isDark        = theme === 'dark'

  return (
    <div
      ref={ref}
      onClick={() => onOpen(p)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-500
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  ${hov ? '-translate-y-2' : ''}
                  ${isDark ? 'bg-[#07071a]' : 'bg-white shadow-sm'}`}
      style={{
        border: `1px solid ${hov ? p.color + '50' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: hov ? `0 0 40px ${p.color}18, 0 20px 50px rgba(0,0,0,0.3)` : undefined,
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

      <ProjectImage project={p} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-['Syne'] font-bold text-lg ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{p.title}</h3>
          <span className="text-xl">{p.emoji}</span>
        </div>
        <p className={`font-mono text-[0.68rem] mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{p.subtitle}</p>
        <p className={`text-[0.855rem] leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {p.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.stack.slice(0, 4).map(s => (
            <span key={s} className={`font-mono text-[0.6rem] px-2 py-0.5 rounded-full border
              ${isDark ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.07)] border-[rgba(0,229,255,0.14)]'
                       : 'text-[#4f46e5] bg-[rgba(79,70,229,0.07)] border-[rgba(79,70,229,0.18)]'}`}>
              {s}
            </span>
          ))}
          {p.stack.length > 4 && (
            <span className={`font-mono text-[0.6rem] px-2 py-0.5 rounded-full border
              ${isDark ? 'text-slate-500 bg-white/[0.03] border-white/[0.06]' : 'text-slate-400 bg-black/[0.03] border-black/[0.07]'}`}>
              +{p.stack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className={`flex gap-4 pt-4 border-t ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
          <a href={p.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
             className="flex items-center gap-1.5 font-mono text-[0.73rem] transition-colors duration-200 hover:opacity-80"
             style={{ color: p.color }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
             className={`flex items-center gap-1.5 font-mono text-[0.73rem] transition-colors duration-200
               ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
            GitHub
          </a>
          <span className={`ml-auto font-mono text-[0.67rem] transition-colors
            ${isDark ? 'text-slate-700 group-hover:text-slate-500' : 'text-slate-300'}`}>
            Click for more ↗
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Detail Modal ── */
function Modal({ project: p, onClose }) {
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  if (!p) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
         onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative z-10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-pop-in border
                   ${isDark ? 'bg-[#07071a]' : 'bg-white shadow-2xl'}`}
        style={{ borderColor: p.color + '40' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors
            ${isDark ? 'bg-white/[0.05] text-slate-400 hover:bg-white/10 hover:text-slate-200'
                     : 'bg-black/[0.05] text-slate-400 hover:bg-black/10 hover:text-slate-700'}`}>
          ✕
        </button>

        {/* Image */}
        <div className="relative h-36 rounded-xl overflow-hidden mb-5">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top"
               onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
          <div className="hidden w-full h-full items-center justify-center rounded-xl"
               style={{ background: p.gradient }}>
            <span className="text-4xl">{p.emoji}</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
             style={{ background: p.color + '15', border: `1px solid ${p.color}30` }}>
          {p.emoji}
        </div>
        <h2 className={`font-['Syne'] font-extrabold text-2xl mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{p.title}</h2>
        <p className="font-mono text-[0.72rem] mb-4" style={{ color: p.color }}>{p.subtitle}</p>
        <p className={`leading-[1.85] mb-6 text-[0.95rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.description}</p>

        <h4 className={`font-['Syne'] font-semibold text-sm mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Key Highlights</h4>
        <ul className="space-y-2.5 mb-6">
          {p.bullets.map((b, i) => (
            <li key={i} className={`flex gap-3 text-[0.875rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span style={{ color: p.color }} className="shrink-0 mt-0.5">▸</span>{b}
            </li>
          ))}
        </ul>

        <h4 className={`font-['Syne'] font-semibold text-sm mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Tech Stack</h4>
        <div className="flex flex-wrap gap-2 mb-8">
          {p.stack.map(s => (
            <span key={s} className="font-mono text-[0.7rem] px-3 py-1 rounded-full"
                  style={{ color: p.color, background: p.color + '10', border: `1px solid ${p.color}25` }}>
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={p.demo} target="_blank" rel="noopener noreferrer"
             className="flex-1 py-2.5 rounded-xl text-center font-['Syne'] font-bold text-sm text-black
                        hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
             style={{ background: p.color }}>
            Live Demo ↗
          </a>
          <a href={p.github} target="_blank" rel="noopener noreferrer"
             className={`flex-1 py-2.5 rounded-xl text-center font-['Syne'] font-bold text-sm
                         border hover:-translate-y-0.5 transition-all duration-200
                         ${isDark ? 'border-slate-700 text-slate-300 hover:border-slate-500' : 'border-slate-200 text-slate-700 hover:border-slate-400'}`}>
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active,   setActive]   = useState('All')
  const [selected, setSelected] = useState(null)
  const { theme } = useTheme()
  const isDark    = theme === 'dark'

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-[#03030c]' : 'bg-[#f0f4ff]'}`}>

      <section className="grid-bg py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Portfolio"
            title={<>Things I've <span className="glow-text">built</span></>}
            subtitle="Live AI systems, full-stack apps, and ML pipelines — click any card for details." />
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      {/* Filters */}
      <div className="px-4 sm:px-6 pt-8 max-w-5xl mx-auto flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length
          return (
            <button key={cat} onClick={() => setActive(cat)}
              className={`font-mono text-[0.73rem] px-4 py-1.5 rounded-full border transition-all duration-200
                ${active === cat
                  ? isDark
                    ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.10)] border-[rgba(0,229,255,0.35)]'
                    : 'text-[#4f46e5] bg-[rgba(79,70,229,0.10)] border-[rgba(79,70,229,0.4)]'
                  : isDark
                    ? 'text-slate-500 border-[rgba(255,255,255,0.07)] hover:text-slate-300'
                    : 'text-slate-500 border-[rgba(0,0,0,0.1)] hover:text-slate-700 bg-white/60'
                }`}>
              {cat} <span className="opacity-50 text-[0.65rem]">({count})</span>
            </button>
          )
        })}
      </div>

      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </div>
      </section>

      {/* GitHub CTA */}
      <div className="pb-16 text-center px-4">
        <a href="https://github.com/Ansh0864" target="_blank" rel="noopener noreferrer"
           className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border font-['Syne'] font-semibold text-sm
                       hover:-translate-y-1 transition-all duration-200
                       ${isDark
                         ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-slate-300 hover:border-[rgba(0,229,255,0.3)] hover:text-[#00e5ff]'
                         : 'bg-white border-[rgba(0,0,0,0.1)] text-slate-600 hover:border-[rgba(79,70,229,0.35)] hover:text-[#4f46e5] shadow-sm'
                       }`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
          View all repos @Ansh0864 ↗
        </a>
      </div>

      <Modal project={selected} onClose={() => setSelected(null)} />
    </div>
  )
}