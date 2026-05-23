import { Link } from 'react-router-dom'
import { INFO } from '../data/info'
import SectionHeader from '../components/SectionHeader'
import useInView from '../hooks/useInView'
import { useTheme } from '../context/ThemeContext'

const TIMELINE = [
  { year:'2022–23', title:'12th Science (PCM)', org:'Vidya Jain Public School', desc:'Completed 12th with Physics, Chemistry & Mathematics.', icon:'📚', color:'#a855f7' },
  { year:'2023',    title:'Started B.Tech CS',  org:'GGSIPU, Delhi', desc:'Deep-dived into DSA with Java, OS, DBMS, and core OOP fundamentals.', icon:'🎓', color:'#00e5ff' },
  { year:'2024',    title:'Full Stack Dev',      org:'Self-Driven Learning', desc:'Built production apps with React, Node, MongoDB, Tailwind, Socket.io.', icon:'⚡', color:'#22c55e' },
  { year:'2025',    title:'AI / GenAI Eng',      org:'Projects & Research', desc:'Integrated LLMs, RAG pipelines with LangChain, CNNs, and blockchain systems.', icon:'🤖', color:'#f59e0b' },
  { year:'2027',    title:'B.Tech Graduation',   org:'GGSIPU — Expected', desc:'On track to graduate with expertise in AI/GenAI and full-stack development.', icon:'🚀', color:'#00e5ff' },
]

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div ref={ref}
      className={`flex gap-5 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
      style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="flex flex-col items-center">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 z-10 border
                         ${isDark ? 'bg-[#07071a] border-[rgba(255,255,255,0.07)]' : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm'}`}
             style={{ boxShadow: `0 0 16px ${item.color}22` }}>
          {item.icon}
        </div>
        {index < TIMELINE.length - 1 && (
          <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom,${item.color}40,transparent)` }} />
        )}
      </div>
      <div className="pb-8">
        <span className="font-mono text-[0.69rem] tracking-widest uppercase mb-0.5 block" style={{ color: item.color }}>
          {item.year}
        </span>
        <h3 className={`font-['Syne'] font-bold text-[1.05rem] mb-0.5 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.title}</h3>
        <p className={`text-[0.78rem] mb-1.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.org}</p>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function About() {
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const [bioRef, bioInView] = useInView()

  return (
    <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-[#03030c]' : 'bg-[#f0f4ff]'}`}>

      <section className="grid-bg py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="About Me" title={<>A developer who thinks in <span className="glow-text">systems</span></>}
            subtitle="CS student at GGSIPU (Delhi) who builds AI-augmented products — combining solid fundamentals with hands-on GenAI engineering." />
          <div className="flex flex-wrap gap-2 mt-8">
            {[`📍 ${INFO.location}`, `🎓 ${INFO.university}`, `✉️ ${INFO.email}`, `📞 ${INFO.phone}`].map(c => (
              <span key={c} className={`font-mono text-[0.72rem] px-3 py-1.5 rounded-full border
                                       ${isDark ? 'text-slate-400 bg-white/[0.03] border-[rgba(255,255,255,0.07)]'
                                                : 'text-slate-500 bg-white/60 border-[rgba(0,0,0,0.08)]'}`}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full border border-dashed animate-spin-slow
                               ${isDark ? 'border-[rgba(0,229,255,0.15)]' : 'border-[rgba(79,70,229,0.15)]'}`} />
              <div className={`w-56 h-56 rounded-full border flex flex-col items-center justify-center animate-float
                               ${isDark
                                 ? 'bg-gradient-to-br from-[rgba(0,229,255,0.07)] to-[rgba(168,85,247,0.07)] border-[rgba(0,229,255,0.15)]'
                                 : 'bg-gradient-to-br from-[rgba(79,70,229,0.07)] to-[rgba(168,85,247,0.07)] border-[rgba(79,70,229,0.2)] shadow-lg'
                               }`}>
                <span className="text-5xl mb-2">👨‍💻</span>
                <span className={`font-mono text-[0.72rem] ${isDark ? 'text-[#00e5ff]' : 'text-[#4f46e5]'}`}>@Ansh0864</span>
              </div>
              {[{l:'React',pos:'-top-2 -right-2',c:'#61DAFB'},{l:'Python',pos:'-bottom-2 -left-2',c:'#3776AB'},{l:'AI/ML',pos:'-bottom-2 -right-2',c:'#a855f7'}]
                .map(b => (
                <span key={b.l} className={`absolute ${b.pos} font-mono text-[0.62rem] px-2 py-0.5 rounded-full border
                                            ${isDark ? 'bg-[#07071a]' : 'bg-white shadow-sm'}`}
                      style={{ color: b.c, borderColor: b.c + '44' }}>{b.l}</span>
              ))}
            </div>
          </div>
          <div ref={bioRef} className={`transition-all duration-700 ${bioInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className={`font-['Syne'] font-bold text-2xl mb-4 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>Hi, I'm Ansh 👋</h2>
            <p className={`leading-[1.9] mb-4 text-[0.97rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Passionate B.Tech CS student specializing in AI/GenAI. Started with DSA in Java, evolved into
              full-stack development, and now building intelligent autonomous systems.
            </p>
            <p className={`leading-[1.9] mb-6 text-[0.97rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              I love the intersection of{' '}
              <span className={isDark ? 'text-[#00e5ff]' : 'text-[#4f46e5]'}>machine learning</span>,{' '}
              <span className="text-purple-500">LLM engineering</span>, and{' '}
              <span className={isDark ? 'text-orange-400' : 'text-orange-500'}>production software</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/cv"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-['Syne'] font-bold text-sm
                            hover:-translate-y-0.5 transition-all duration-200
                            ${isDark
                              ? 'bg-[#00e5ff] text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                              : 'bg-[#2563eb] text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                            }`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                View CV
              </Link>
              <a href={INFO.github} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-['Syne'] font-semibold text-sm
                            hover:-translate-y-0.5 transition-all duration-200
                            ${isDark
                              ? 'border-[rgba(0,229,255,0.2)] text-slate-300 hover:border-[rgba(0,229,255,0.4)] hover:text-[#00e5ff]'
                              : 'border-[rgba(79,70,229,0.25)] text-slate-600 hover:border-[rgba(79,70,229,0.45)] hover:text-[#4f46e5]'
                            }`}>
                GitHub ↗
              </a>
              <a href={INFO.linkedin} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border font-['Syne'] font-semibold text-sm
                            hover:-translate-y-0.5 transition-all duration-200
                            ${isDark
                              ? 'border-[rgba(14,165,233,0.2)] text-slate-300 hover:border-[rgba(14,165,233,0.4)] hover:text-sky-400'
                              : 'border-[rgba(14,165,233,0.25)] text-slate-600 hover:border-[rgba(14,165,233,0.45)] hover:text-sky-600'
                            }`}>
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Journey" title={<>My <span className="glow-text">Timeline</span></>} />
          <div className="mt-12 max-w-xl">
            {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      <section className="py-20 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className={`font-['Syne'] font-extrabold text-3xl mb-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Want to collaborate?</h2>
          <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Check out my projects or drop me a message.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/projects"
              className={`px-7 py-3 rounded-xl font-['Syne'] font-bold text-sm hover:-translate-y-0.5 transition-all duration-200
                          ${isDark ? 'bg-[#00e5ff] text-black hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]'
                                   : 'bg-[#4f46e5] text-white hover:shadow-[0_0_24px_rgba(79,70,229,0.35)]'}`}>
              View Projects →
            </Link>
            <Link to="/contact"
              className={`px-7 py-3 rounded-xl border font-['Syne'] font-bold text-sm hover:-translate-y-0.5 transition-all duration-200
                          ${isDark ? 'border-[rgba(0,229,255,0.3)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)]'
                                   : 'border-[rgba(79,70,229,0.35)] text-[#4f46e5] hover:bg-[rgba(79,70,229,0.06)]'}`}>
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}