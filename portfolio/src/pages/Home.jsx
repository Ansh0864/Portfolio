import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { INFO, ROLES, STATS } from '../data/info'
import useTypewriter from '../hooks/useTypewriter'
import useInView from '../hooks/useInView'
import { useTheme } from '../context/ThemeContext'

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function Particles({ isDark }) {
  const canvas = useRef(null)
  useEffect(() => {
    const c = canvas.current, ctx = c.getContext('2d')
    let w = c.width = window.innerWidth
    let h = c.height = window.innerHeight
    let raf
    const col = isDark ? '0,229,255' : '37,99,235'
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: (Math.random() - 0.5) * 0.22,
      o: Math.random() * 0.35 + 0.07,
    }))
    function draw() {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${p.o})`; ctx.fill()
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [isDark])
  return <canvas ref={canvas} className="absolute inset-0 pointer-events-none opacity-60" />
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ num, suffix, isDark }) {
  const [ref, inView] = useInView()
  const [val, setVal] = useState(0)
  const n = parseInt(num)
  useEffect(() => {
    if (!inView) return
    const dur = 1400, step = 16
    const inc = n / (dur / step)
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + inc, n); setVal(Math.floor(cur))
      if (cur >= n) clearInterval(t)
    }, step)
    return () => clearInterval(t)
  }, [inView, n])
  return (
    <span ref={ref} className={`font-['Syne'] font-extrabold text-[2.6rem] leading-none ${isDark ? 'text-[#00e5ff]' : 'text-[#2563eb]'}`}>
      {val}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   TECH BADGE (decorative floating)
───────────────────────────────────────────── */
function TechBadge({ label, icon, style, isDark, delay = 0 }) {
  return (
    <div
      className={`absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono
                  border shadow-lg animate-float hidden xl:flex`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${3.5 + delay * 0.5}s`,
        background: isDark ? 'rgba(7,7,26,0.9)' : 'rgba(255,255,255,0.95)',
        borderColor: isDark ? 'rgba(0,229,255,0.18)' : 'rgba(37,99,235,0.18)',
        color: isDark ? '#94a3b8' : '#334155',
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ROUTE CARD
───────────────────────────────────────────── */
function RouteCard({ to, label, desc, icon, color, index, isDark }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-250
                  animate-fade-up
                  ${hov ? '-translate-y-1.5' : 'translate-y-0'}
                  ${isDark
                    ? `bg-[#07071a] ${hov ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(255,255,255,0.06)]'}`
                    : `bg-white ${hov ? 'border-[rgba(37,99,235,0.3)] shadow-lg shadow-blue-50' : 'border-[rgba(37,99,235,0.12)] shadow-sm'}`
                  }`}
      style={{
        animationDelay: `${0.5 + index * 0.08}s`,
        borderColor: hov ? color + '55' : undefined,
        boxShadow: hov ? `0 8px 30px ${color}18` : undefined,
      }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-110"
           style={{ background: color + '15', border: `1px solid ${color}28` }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-['Syne'] font-bold text-sm ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{label}</p>
        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{desc}</p>
      </div>
      <svg className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-90 group-hover:translate-x-1 transition-all duration-200"
           viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color }}>
        <path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </Link>
  )
}

const ROUTE_CARDS = [
  { to:'/about',    label:'About Me',  desc:'Background, timeline & education', icon:'👨‍💻', color:'#00e5ff' },
  { to:'/projects', label:'Projects',  desc:'5 live AI & full-stack apps',       icon:'🚀', color:'#a855f7' },
  { to:'/skills',   label:'Skills',    desc:'Tech stack & proficiency levels',   icon:'⚡', color:'#22c55e' },
  { to:'/contact',  label:'Contact',   desc:'Hire me or start a collaboration',  icon:'✉️', color:'#f59e0b' },
]

/* ─────────────────────────────────────────────
   SOCIAL LINK
───────────────────────────────────────────── */
function SocialLink({ href, icon, label, isDark }) {
  return (
    <a href={href} target={href.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer"
       aria-label={label}
       className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-1
                   ${isDark
                     ? 'border-[rgba(255,255,255,0.08)] text-slate-500 hover:text-[#00e5ff] hover:border-[rgba(0,229,255,0.3)] hover:bg-[rgba(0,229,255,0.06)]'
                     : 'border-[rgba(37,99,235,0.12)] text-slate-400 hover:text-[#2563eb] hover:border-[rgba(37,99,235,0.35)] hover:bg-[rgba(37,99,235,0.05)] bg-white shadow-sm'
                   }`}>
      {icon}
    </a>
  )
}

/* ─────────────────────────────────────────────
   MAIN HOME
───────────────────────────────────────────── */
export default function Home() {
  const typed  = useTypewriter(ROLES)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`relative min-h-screen overflow-hidden grid-bg transition-colors duration-300
                     ${isDark ? 'bg-[#03030c]' : 'bg-[#f0f6ff]'}`}>
      {isDark && <div className="scan-line" />}
      <Particles isDark={isDark} />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-60 -left-40 w-[700px] h-[700px] rounded-full"
           style={{ background: `radial-gradient(circle, var(--hero-glow1) 0%, transparent 65%)` }} />
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full"
           style={{ background: `radial-gradient(circle, var(--hero-glow2) 0%, transparent 65%)` }} />

      {/* Floating tech badges */}
      <TechBadge label="LangChain.js" icon="🔗" isDark={isDark} delay={0}    style={{ top:'22%', right:'18%' }} />
      <TechBadge label="React.js"     icon="⚛️"  isDark={isDark} delay={0.8}  style={{ top:'38%', right:'12%' }} />
      <TechBadge label="TensorFlow"   icon="🧠"  isDark={isDark} delay={1.6}  style={{ top:'56%', right:'20%' }} />
      <TechBadge label="Node.js"      icon="🟢"  isDark={isDark} delay={2.4}  style={{ top:'70%', right:'10%' }} />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 flex flex-col justify-center min-h-screen pt-20 pb-16">

        {/* Status pill */}
        <div className={`animate-fade-up delay-100 animate-badge-pop self-start inline-flex items-center gap-2.5
                          px-4 py-2 rounded-full mb-8 border`}
             style={{
               background: isDark ? 'rgba(34,197,94,0.06)' : 'rgba(22,163,74,0.07)',
               borderColor: isDark ? 'rgba(34,197,94,0.22)' : 'rgba(22,163,74,0.25)',
             }}>
          <span className={`w-2 h-2 rounded-full animate-pulse-ring ${isDark ? 'bg-green-400' : 'bg-green-600'}`} />
          <span className={`font-mono text-[0.68rem] uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-green-700'}`}>
            Open to Internships &amp; Opportunities
          </span>
        </div>

        {/* ── Name ── */}
        <div className="overflow-hidden mb-2">
          <h1 className={`animate-hero-name delay-200 font-['Syne'] font-extrabold leading-[1.0]
                           text-[clamp(3rem,10vw,7.5rem)]
                           ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            Ansh
          </h1>
        </div>
        <div className="overflow-hidden mb-5">
          <h1 className="animate-hero-name delay-300 font-['Syne'] font-extrabold leading-[1.0]
                          text-[clamp(3rem,10vw,7.5rem)] glow-text">
            Chauhan.
          </h1>
        </div>

        {/* Typewriter role */}
        <div className={`animate-fade-up delay-400 font-mono flex items-center gap-2 flex-wrap mb-5
                         text-[clamp(0.88rem,2.2vw,1.2rem)]
                         ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          <span className={isDark ? 'text-orange-400' : 'text-orange-500'}>$</span>
          <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{typed}</span>
          <span className={`animate-blink text-xl ${isDark ? 'text-[#00e5ff]' : 'text-[#2563eb]'}`}>▍</span>
        </div>

        {/* Bio */}
        <div className={`animate-fade-up delay-400 max-w-[520px] leading-[1.9] mb-10 space-y-3`}>
          <p className={`text-[1rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            B.Tech CS student from Delhi building{' '}
            <span className={`font-semibold ${isDark ? 'text-[#00e5ff]' : 'text-[#2563eb]'}`}>AI-augmented applications</span>
            {' '}— from autonomous RAG agents to real-time emotion AI. Bridging{' '}
            <em className={`not-italic font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>deep learning</em>
            {' '}with{' '}
            <em className={`not-italic font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>production software</em>.
          </p>
          <p className={`text-[1rem] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Also building scalable{' '}
            <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>full-stack web apps</span>
            {' '}— real-time systems with Socket.io, REST APIs, and responsive mobile-first UIs using React &amp; Node.
          </p>
        </div>

        {/* ── CTAs ── */}
        <div className="animate-fade-up delay-500 flex flex-wrap gap-3 mb-12">
          <Link to="/projects"
            className={`px-7 py-3.5 rounded-xl font-['Syne'] font-bold text-sm
                        hover:-translate-y-1 transition-all duration-200
                        ${isDark
                          ? 'bg-[#00e5ff] text-black hover:shadow-[0_0_28px_rgba(0,229,255,0.5)]'
                          : 'bg-[#2563eb] text-white hover:shadow-[0_4px_20px_rgba(37,99,235,0.45)]'
                        }`}>
            View Projects →
          </Link>

          <Link to="/cv"
            className={`px-7 py-3.5 rounded-xl border font-['Syne'] font-bold text-sm
                         flex items-center gap-2 hover:-translate-y-1 transition-all duration-200
                         ${isDark
                           ? 'border-[rgba(0,229,255,0.3)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)]'
                           : 'border-[rgba(37,99,235,0.35)] text-[#2563eb] hover:bg-[rgba(37,99,235,0.06)] bg-white shadow-sm'
                         }`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            View CV
          </Link>

          <a href={`mailto:${INFO.email}`}
             className={`px-7 py-3.5 rounded-xl border font-['Syne'] font-bold text-sm
                         hover:-translate-y-1 transition-all duration-200
                         ${isDark
                           ? 'border-[rgba(255,255,255,0.1)] text-slate-300 hover:border-[rgba(255,255,255,0.22)] hover:text-white'
                           : 'border-[rgba(0,0,0,0.1)] text-slate-600 hover:border-[rgba(0,0,0,0.2)] hover:text-slate-900 bg-white shadow-sm'
                         }`}>
            Hire Me
          </a>
        </div>

        {/* ── Social icons ── */}
        <div className="animate-fade-up delay-500 flex gap-2.5 mb-14">
          <SocialLink href={INFO.github} isDark={isDark} label="GitHub"
            icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>} />
          <SocialLink href={INFO.linkedin} isDark={isDark} label="LinkedIn"
            icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/></svg>} />
          <SocialLink href={`mailto:${INFO.email}`} isDark={isDark} label="Email"
            icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>} />
          <SocialLink href={`tel:${INFO.phone.replace(/\s/g,'')}`} isDark={isDark} label="Phone"
            icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>} />
        </div>

        {/* ── Stats ── */}
        <div className={`animate-fade-up delay-600 flex flex-wrap gap-10 pb-8 border-b mb-10
                         ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(37,99,235,0.1)]'}`}>
          {STATS.map(({ num, suffix, label }) => (
            <div key={label}>
              <Counter num={num} suffix={suffix} isDark={isDark} />
              <div className={`font-mono text-[0.65rem] uppercase tracking-[0.18em] mt-1
                               ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Routing cards ── */}
        <div className="animate-fade-up delay-700">
          <p className={`font-mono text-[0.68rem] uppercase tracking-[0.18em] mb-4
                         ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            Explore Portfolio
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[620px]">
            {ROUTE_CARDS.map((card, i) => (
              <RouteCard key={card.to} {...card}
                         color={isDark ? card.color : '#2563eb'}
                         index={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating code block — xlarge only */}
      <pre className={`hidden xl:block pointer-events-none select-none absolute right-[3.5%] top-[50%]
                        -translate-y-[55%] font-mono text-[0.63rem] leading-[2.1] animate-float
                        ${isDark ? 'text-[rgba(0,229,255,0.09)]' : 'text-[rgba(37,99,235,0.09)]'}`}>
{`const agent = new LangChainAgent({
  model: "llama-3.3-70b",
  tools: [searchWeb, stockData],
  memory: new VectorStore(),
});

const result = await agent.invoke({
  query: "Analyse AAPL Q4 2025",
  grounded: true,
  rag: true,
});

// output: structured report
// sources: [polygon.io, tavily]
// hallucinations: 0`}
      </pre>

      {/* Scroll hint */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                       ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
        <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase">scroll</span>
        <div className={`w-px h-7 ${isDark ? 'bg-gradient-to-b from-slate-600 to-transparent' : 'bg-gradient-to-b from-slate-300 to-transparent'}`} />
      </div>
    </div>
  )
}