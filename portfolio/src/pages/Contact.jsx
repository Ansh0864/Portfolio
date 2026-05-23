import { useState, useRef } from 'react'
import { INFO } from '../data/info'
import SectionHeader from '../components/SectionHeader'
import useInView from '../hooks/useInView'
import { useTheme } from '../context/ThemeContext'
import CVDownloadButton from '../components/CVDownloadButton'


const SVC  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const TPL  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const CONFIGURED = SVC && TPL && KEY

/* ── Toast notification ── */
function Toast({ toast }) {
  if (!toast) return null
  const bg = toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-slate-700'
  const ic = toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'
  return (
    <div className={`fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-3 px-5 py-3.5
                     rounded-xl shadow-2xl animate-pop-in max-w-[calc(100vw-2rem)] sm:max-w-sm text-white ${bg}`}>
      <span className="text-xl shrink-0">{ic}</span>
      <p className="font-['Syne'] font-semibold text-sm">{toast.message}</p>
    </div>
  )
}

/* ── Copy button ── */
function CopyBtn({ value, isDark }) {
  const [ok, setOk] = useState(false)
  const copy = async (e) => {
    e.preventDefault(); e.stopPropagation()
    try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 2000) }
    catch { /* ignore */ }
  }
  return (
    <button onClick={copy}
      className={`ml-auto px-2 py-0.5 rounded font-mono text-[0.6rem] border transition-all duration-200 shrink-0
        ${ok
          ? 'text-green-500 border-green-400/30 bg-green-400/08'
          : isDark
            ? 'text-slate-600 border-[rgba(255,255,255,0.08)] hover:text-slate-300'
            : 'text-slate-400 border-[rgba(37,99,235,0.12)] hover:text-slate-700 hover:border-[rgba(37,99,235,0.25)]'
        }`}>
      {ok ? '✓ copied' : 'copy'}
    </button>
  )
}

/* ── Contact card data ── */
const CONTACTS = [
  { label:'Email',    value: INFO.email,          href:`mailto:${INFO.email}`,  icon:'📧', copyable:true  },
  { label:'Phone',    value: INFO.phone,           href:`tel:+919899609856`,     icon:'📱', copyable:true  },
  { label:'LinkedIn', value:'ansh-chauhan-7848b7314', href:INFO.linkedin,        icon:'💼', external:true  },
  { label:'GitHub',   value:'@Ansh0864',           href:INFO.github,             icon:'🐙', external:true  },
  { label:'Location', value:'Delhi, India',         href:'https://maps.google.com/?q=Delhi+India', icon:'📍', external:true },
]

/* ── Form field ── */
function Field({ label, name, type, placeholder, value, onChange, isDark, required }) {
  return (
    <div>
      <label className={`block font-mono text-[0.67rem] uppercase tracking-[0.12em] mb-2
                         ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
        {label}{required && <span className={isDark ? 'text-[#00e5ff]' : 'text-[#2563eb]'}> *</span>}
      </label>
      <input type={type} name={name} placeholder={placeholder} value={value}
             onChange={onChange} required={required}
             className="themed-input" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN CONTACT PAGE
───────────────────────────────────────────── */
export default function Contact() {
  const { theme } = useTheme()
  const isDark    = theme === 'dark'
  const formEl    = useRef(null)
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [toast,   setToast]   = useState(null)
  const [formRef, formInView] = useInView()

  const showToast = (type, msg) => { setToast({ type, message: msg }); setTimeout(() => setToast(null), 4500) }
  const onChange  = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('error', 'Please fill in all required fields.')
      return
    }

    if (CONFIGURED) {
      /* ── EmailJS path ── */
      setLoading(true)
      try {
        const { default: emailjs } = await import('@emailjs/browser')
        await emailjs.sendForm(SVC, TPL, formEl.current, KEY)
        showToast('success', `Message sent! I'll reply to ${form.email} within 24 hrs.`)
        setForm({ name: '', email: '', subject: '', message: '' })
      } catch (err) {
        console.error('EmailJS error:', err)
        showToast('error', 'EmailJS failed. Falling back to mail client…')
        setTimeout(() => openMailto(), 1200)
      } finally {
        setLoading(false)
      }
    } else {
      /* ── Mailto fallback ── always works, no setup needed ── */
      openMailto()
      showToast('success', "Your mail client opened. Hit send and I'll get it! 🚀")
    }
  }

  const openMailto = () => {
    const subj = form.subject || `Portfolio Inquiry from ${form.name}`
    const body  = `Hi Ansh,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n---\nSent from portfolio contact form`
    window.location.href = `mailto:${INFO.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className={`pt-16 transition-colors duration-300 ${isDark ? 'bg-[#03030c]' : 'bg-[#f0f6ff]'}`}>
      <Toast toast={toast} />

      {/* Header */}
      <section className="grid-bg py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Contact"
            title={<>Let's <span className="glow-text">connect</span></>}
            subtitle="Open to internships, full-time jobs, freelance & collaborations. " />
        </div>
      </section>

      <div className={`h-px ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(37,99,235,0.1)]'}`} />

      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: contact cards (2 cols) ── */}
          <div className="lg:col-span-2 space-y-2.5">
            <p className={`font-['Syne'] font-semibold text-sm mb-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Reach me directly
            </p>

            {CONTACTS.map((item, i) => (
              <a key={item.label}
                 href={item.href}
                 target={item.external ? '_blank' : '_self'}
                 rel="noopener noreferrer"
                 className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-all duration-200
                              hover:-translate-y-0.5 animate-slide-left
                              ${isDark
                                ? 'bg-[#07071a] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)]'
                                : 'bg-white border-[rgba(37,99,235,0.10)] hover:border-[rgba(37,99,235,0.28)] shadow-sm hover:shadow-md'
                              }`}
                 style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0
                                 group-hover:scale-110 transition-transform duration-200
                                 ${isDark ? 'bg-white/[0.04]' : 'bg-[rgba(37,99,235,0.06)]'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-mono text-[0.63rem] uppercase tracking-widest mb-0.5
                                 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>{item.label}</p>
                  <p className={`text-[0.875rem] truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.value}</p>
                </div>
                {item.copyable && <CopyBtn value={item.value} isDark={isDark} />}
                {item.external && (
                  <span className={`text-xs opacity-30 group-hover:opacity-70 transition-opacity ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>↗</span>
                )}
              </a>
            ))}

            {/* CV Download */}
            <CVDownloadButton variant="card" className="mt-4" />

            {/* Availability badge */}
            <div className={`px-4 py-3.5 rounded-xl border mt-2
                             ${isDark ? 'bg-green-500/[0.04] border-green-500/[0.18]' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full animate-pulse-ring ${isDark ? 'bg-green-400' : 'bg-green-500'}`} />
                <span className={`font-mono text-[0.67rem] uppercase tracking-widest ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  Available Now
                </span>
              </div>
              <p className={`text-[0.8rem] leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                Open to internships, full-time jobs, freelance projects &amp; open-source collaborations.
              </p>
            </div>
          </div>

          {/* ── Right: Form (3 cols) ── */}
          <div ref={formRef}
               className={`lg:col-span-3 rounded-2xl border p-6 sm:p-8 transition-all duration-700
                            ${formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                            ${isDark ? 'bg-[#07071a] border-[rgba(255,255,255,0.07)]' : 'bg-white border-[rgba(37,99,235,0.10)] shadow-sm'}`}>

            <div className="flex items-start gap-3 mb-6">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0
                               ${isDark ? 'bg-[rgba(0,229,255,0.08)]' : 'bg-[rgba(37,99,235,0.08)]'}`}>✉️</div>
              <div>
                <h3 className={`font-['Syne'] font-bold text-xl leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  Send a Message
                </h3>
                <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                  Goes directly to iamansh86@gmail.com
                </p>
              </div>
            </div>

            <form ref={formEl} onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name" name="name" type="text"
                       placeholder="Jane Smith / ACME Corp"
                       value={form.name} onChange={onChange} isDark={isDark} required />
                <Field label="Your Email" name="email" type="email"
                       placeholder="you@company.com"
                       value={form.email} onChange={onChange} isDark={isDark} required />
              </div>
              <Field label="Subject" name="subject" type="text"
                     placeholder="Internship / Job / Project Collab"
                     value={form.subject} onChange={onChange} isDark={isDark} />
              <div>
                <label className={`block font-mono text-[0.67rem] uppercase tracking-[0.12em] mb-2
                                   ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Message <span className={isDark ? 'text-[#00e5ff]' : 'text-[#2563eb]'}>*</span>
                </label>
                <textarea name="message" rows={6} required
                  placeholder="Tell me about the role, project, or collaboration you have in mind…"
                  value={form.message} onChange={onChange}
                  className="themed-input resize-none"
                  style={{ lineHeight:1.75 }}
                />
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-4 rounded-xl font-['Syne'] font-bold text-sm
                             flex items-center justify-center gap-2.5
                             hover:-translate-y-0.5 transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                             ${isDark
                               ? 'bg-[#00e5ff] text-black hover:shadow-[0_0_28px_rgba(0,229,255,0.45)]'
                               : 'bg-[#2563eb] text-white hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)]'
                             }`}>
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>

              {/* EmailJS setup prompt */}
              {!CONFIGURED && (
                <p className={`text-center text-[0.72rem] font-mono ${isDark ? 'text-slate-700' : 'text-slate-400'}`}>
                  Tip: add VITE_EMAILJS_* to .env for direct sending — see .env.example
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}