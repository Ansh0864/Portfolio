import { useState } from 'react'
import { SKILL_GROUPS, TOOLS } from '../data/skills'
import SectionHeader from '../components/SectionHeader'
import useInView from '../hooks/useInView'
import { useTheme } from '../context/ThemeContext'

/* ── Animated skill bar row ── */
function SkillRow({ skill, groupColor, index }) {
  const [ref, inView] = useInView()
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const lvl       = skill.level

  return (
    <div ref={ref}
      className={`transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <span className={`font-['IBM_Plex_Sans'] text-[0.88rem] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {skill.name}
          </span>
          <span className={`font-mono text-[0.6rem] px-1.5 py-0.5 rounded-full
            ${isDark ? 'text-slate-600 bg-white/[0.03]' : 'text-slate-400 bg-black/[0.04]'}`}>
            {skill.years}
          </span>
        </div>
        <span className="font-mono text-[0.7rem] font-medium" style={{ color: groupColor }}>{lvl}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/[0.05]' : 'bg-black/[0.06]'}`}>
        <div className="h-full rounded-full skill-fill" style={{ width: inView ? `${lvl}%` : '0%' }} />
      </div>
    </div>
  )
}

/* ── Skill group card ── */
function SkillCard({ group, index }) {
  const [ref, inView] = useInView()
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const avg = Math.round(group.skills.reduce((a, s) => a + s.level, 0) / group.skills.length)

  return (
    <div ref={ref}
      className={`rounded-2xl border overflow-hidden transition-all duration-600
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  ${isDark ? 'bg-[#07071a] border-[rgba(255,255,255,0.06)]' : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm'}`}
      style={{ transitionDelay: `${index * 100}ms` }}>

      {/* Card header */}
      <div className={`flex items-center justify-between p-5 pb-4 border-b
                       ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.06)]'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
               style={{ background: group.color + '15', border: `1px solid ${group.color}30` }}>
            {group.icon}
          </div>
          <div>
            <h3 className={`font-['Syne'] font-bold text-[0.95rem] ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              {group.category}
            </h3>
            <p className={`font-mono text-[0.65rem] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
              {group.skills.length} skills
            </p>
          </div>
        </div>
        {/* Avg score ring */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg width="48" height="48" className="absolute" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3"
                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3"
                    stroke={group.color} strokeLinecap="round"
                    strokeDasharray={`${avg * 1.257} 125.7`}
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dasharray 1.2s ease' }} />
          </svg>
          <span className="font-mono text-[0.65rem] font-bold relative z-10" style={{ color: group.color }}>
            {avg}%
          </span>
        </div>
      </div>

      {/* Skill bars */}
      <div className="p-5 space-y-4">
        {group.skills.map((s, i) => (
          <SkillRow key={s.name} skill={s} groupColor={group.color} index={i} />
        ))}
      </div>
    </div>
  )
}

/* ── Tool chip ── */
function ToolChip({ tool }) {
  const [hov, setHov] = useState(false)
  const { theme } = useTheme()
  const isDark    = theme === 'dark'

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm border cursor-default
                  transition-all duration-200
                  ${hov ? '-translate-y-1' : ''}
                  ${isDark
                    ? `${hov ? 'border-[rgba(255,255,255,0.15)] bg-white/[0.06]' : 'border-[rgba(255,255,255,0.07)] bg-white/[0.025]'}`
                    : `${hov ? 'border-[rgba(0,0,0,0.18)] bg-white shadow-md' : 'border-[rgba(0,0,0,0.08)] bg-white shadow-sm'}`
                  }`}
    >
      <span className="text-lg">{tool.icon}</span>
      <span className={`font-mono text-[0.75rem] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{tool.name}</span>
      {hov && (
        <span className="w-1.5 h-1.5 rounded-full ml-auto" style={{ background: tool.color }} />
      )}
    </div>
  )
}

/* ── Proficiency key ── */
function ProfKey({ isDark }) {
  const levels = [
    { range: '90–100%', label: 'Expert',       color: '#00e5ff' },
    { range: '75–89%',  label: 'Proficient',   color: '#22c55e' },
    { range: '60–74%',  label: 'Intermediate', color: '#f59e0b' },
    { range: '< 60%',   label: 'Learning',     color: '#a855f7' },
  ]
  return (
    <div className={`flex flex-wrap gap-4 mt-6 p-4 rounded-xl border
                     ${isDark ? 'bg-white/[0.02] border-[rgba(255,255,255,0.06)]' : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm'}`}>
      <span className={`text-xs font-mono w-full ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Proficiency Key:</span>
      {levels.map(l => (
        <div key={l.label} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {l.label} <span className="opacity-50">({l.range})</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All')
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const [toolsRef, toolsInView] = useInView()

  const tabs = ['All', ...SKILL_GROUPS.map(g => g.category)]
  const displayed = activeTab === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter(g => g.category === activeTab)

  return (
    <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-[#03030c]' : 'bg-[#f0f4ff]'}`}>

      {/* Header */}
      <section className="grid-bg py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Expertise" title={<>My <span className="glow-text">Tech Stack</span></>}
            subtitle="Skills built through real projects — from LLM pipelines to blockchain systems." />
          <ProfKey isDark={isDark} />
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      {/* Tabs */}
      <div className="px-4 sm:px-6 pt-8 pb-0 max-w-5xl mx-auto overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`font-mono text-[0.72rem] px-4 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200
                ${activeTab === tab
                  ? isDark
                    ? 'text-[#00e5ff] bg-[rgba(0,229,255,0.10)] border-[rgba(0,229,255,0.35)]'
                    : 'text-[#4f46e5] bg-[rgba(79,70,229,0.10)] border-[rgba(79,70,229,0.4)]'
                  : isDark
                    ? 'text-slate-500 border-[rgba(255,255,255,0.07)] hover:text-slate-300'
                    : 'text-slate-500 border-[rgba(0,0,0,0.1)] hover:text-slate-700 bg-white/60'
                }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Skill cards grid */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          {displayed.map((g, i) => <SkillCard key={g.category} group={g} index={i} />)}
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      {/* Tools section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Tools" title="Tools & Platforms"
            subtitle="The ecosystem I work with on a daily basis." />
          <div ref={toolsRef}
               className={`flex flex-wrap gap-3 mt-10 transition-all duration-700
                           ${toolsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {TOOLS.map(t => <ToolChip key={t.name} tool={t} />)}
          </div>
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(99,102,241,0.12)]'}`} />

      {/* Education band */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5`}>
            {[
              { label: 'University', color: '#00e5ff', degree: 'B.Tech Computer Science', org: 'GGSIPU, Delhi', year: '2023 – 2027', icon: '🎓' },
              { label: 'School',     color: '#a855f7', degree: '12th Science (PCM)',       org: 'Vidya Jain Public School', year: '2022 – 2023', icon: '📚' },
            ].map(e => (
              <div key={e.label}
                className={`rounded-2xl border p-6 flex items-start gap-4
                            ${isDark ? 'bg-[#07071a] border-[rgba(255,255,255,0.06)]' : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm'}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                     style={{ background: e.color + '15', border: `1px solid ${e.color}30` }}>
                  {e.icon}
                </div>
                <div>
                  <span className="font-mono text-[0.67rem] uppercase tracking-widest block mb-1" style={{ color: e.color }}>
                    {e.label}
                  </span>
                  <h3 className={`font-['Syne'] font-extrabold text-[1.05rem] mb-0.5 ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                    {e.degree}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{e.org}</p>
                  <p className={`font-mono text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{e.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}