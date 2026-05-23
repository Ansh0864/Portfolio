import useCVDownload from '../hooks/useCVDownload'
import { useTheme } from '../context/ThemeContext'

const DlIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const Spin = () => (
  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
)

/** variant: 'primary' | 'outline' | 'card' */
export default function CVDownloadButton({ variant = 'outline', className = '', label = 'Download CV' }) {
  const { download, status } = useCVDownload()
  const { theme }  = useTheme()
  const isDark      = theme === 'dark'
  const isLoading   = status === 'loading'
  const isDone      = status === 'done'

  const accent = isDark ? '#00e5ff' : '#2563eb'

  const baseBtn = `inline-flex items-center gap-2 font-['Syne'] font-bold text-sm
                   hover:-translate-y-0.5 transition-all duration-200 rounded-xl
                   disabled:opacity-60 disabled:cursor-not-allowed`

  const primaryCls = isDark
    ? 'px-7 py-3.5 bg-[#00e5ff] text-black hover:shadow-[0_0_28px_rgba(0,229,255,0.5)]'
    : 'px-7 py-3.5 bg-[#2563eb] text-white hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)]'

  const outlineCls = isDark
    ? 'px-5 py-2.5 border border-[rgba(0,229,255,0.3)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)]'
    : 'px-5 py-2.5 border border-[rgba(37,99,235,0.35)] text-[#2563eb] hover:bg-[rgba(37,99,235,0.06)] bg-white shadow-sm'

  if (variant === 'card') {
    return (
      <button onClick={() => download()} disabled={isLoading}
        className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border
                    transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60
                    ${isDark
                      ? 'bg-gradient-to-r from-[rgba(0,229,255,0.06)] to-[rgba(168,85,247,0.03)] border-[rgba(0,229,255,0.18)] hover:border-[rgba(0,229,255,0.35)]'
                      : 'bg-gradient-to-r from-[rgba(37,99,235,0.06)] to-[rgba(99,102,241,0.04)] border-[rgba(37,99,235,0.18)] hover:border-[rgba(37,99,235,0.38)] shadow-sm'
                    } ${className}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl
                           ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(37,99,235,0.08)]'}`}>📄</div>
          <div className="text-left">
            <p className={`font-['Syne'] font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              {isDone ? 'Downloaded!' : 'Download CV'}
            </p>
            <p className={`font-mono text-[0.62rem] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              AnshChauhan_CV.pdf · 85KB
            </p>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 font-mono text-[0.72rem] font-bold`} style={{ color: accent }}>
          {isLoading ? <Spin /> : isDone ? '✓' : <DlIcon />}
          {isLoading ? 'Preparing…' : isDone ? 'Done!' : 'Download'}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={() => download()}
      disabled={isLoading}
      className={`${baseBtn} ${variant === 'primary' ? primaryCls : outlineCls} ${className}`}
    >
      {isLoading ? <Spin /> : isDone ? <span>✓</span> : <DlIcon />}
      {isLoading ? 'Preparing…' : isDone ? 'Downloaded!' : label}
    </button>
  )
}