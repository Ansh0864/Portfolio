import { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import CVDownloadButton from '../components/CVDownloadButton'
import CV_BASE64 from '../data/cvBase64'

const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
const WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

export default function CVViewer() {
  const { theme }   = useTheme()
  const isDark      = theme === 'dark'
  const containerRef = useRef(null)
  const pdfDocRef    = useRef(null)   // holds loaded pdf document
  const scriptLoaded = useRef(false)

  const [status, setStatus] = useState('loading')
  const [pages,  setPages]  = useState(0)
  const [scale,  setScale]  = useState(1.5)

  const accent    = isDark ? '#00e5ff'  : '#2563eb'
  const bg        = isDark ? '#03030c'  : '#f0f6ff'
  const bgCard    = isDark ? '#07071a'  : '#ffffff'
  const bgStrip   = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)'
  const border    = isDark ? 'rgba(0,229,255,0.12)'   : 'rgba(37,99,235,0.14)'
  const textBase  = isDark ? '#e2e8f0'  : '#0f172a'
  const textMuted = isDark ? '#64748b'  : '#64748b'

  /* ── Render pages from already-loaded pdf doc ── */
  const renderPages = useCallback(async (pdf, sc) => {
    if (!containerRef.current || !pdf) return
    containerRef.current.innerHTML = ''
    for (let p = 1; p <= pdf.numPages; p++) {
      const page     = await pdf.getPage(p)
      const viewport = page.getViewport({ scale: sc })
      const canvas   = document.createElement('canvas')
      canvas.width   = viewport.width
      canvas.height  = viewport.height
      Object.assign(canvas.style, {
        width: '100%', display: 'block',
        background: '#fff',
        marginBottom: p < pdf.numPages ? '2px' : '0',
      })
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
      if (containerRef.current) containerRef.current.appendChild(canvas)
    }
  }, [])

  /* ── Initial load — fetch PDF.js script once ── */
  useEffect(() => {
    if (scriptLoaded.current) return
    scriptLoaded.current = true

    const script = document.createElement('script')
    script.src = PDFJS
    document.head.appendChild(script)

    script.onload = async () => {
      try {
        const lib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib
        lib.GlobalWorkerOptions.workerSrc = WORKER

        const raw   = atob(CV_BASE64)
        const bytes = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)

        const pdf = await lib.getDocument({ data: bytes }).promise
        pdfDocRef.current = pdf
        setPages(pdf.numPages)
        await renderPages(pdf, scale)
        setStatus('done')
      } catch (err) {
        console.error('PDF.js load error:', err)
        setStatus('error')
      }
    }
    script.onerror = () => setStatus('error')
  }, []) // eslint-disable-line

  /* ── Re-render on scale change (pdf doc already loaded) ── */
  useEffect(() => {
    if (!pdfDocRef.current) return  // not loaded yet, initial load handles it
    setStatus('rendering')
    renderPages(pdfDocRef.current, scale).then(() => setStatus('done'))
  }, [scale, renderPages])

  const zoomOut = () => setScale(s => Math.max(0.75, parseFloat((s - 0.25).toFixed(2))))
  const zoomIn  = () => setScale(s => Math.min(3.0,  parseFloat((s + 0.25).toFixed(2))))
  const zoomReset = () => setScale(1.5)

  return (
    <div style={{ minHeight: '100vh', background: bg, paddingTop: '64px' }}>

      {/* ── Top bar ── */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '1.5rem 1rem 0.75rem',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
      }}>
        <div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800,
                       fontSize: 'clamp(1.1rem,3vw,1.5rem)', color: textBase, marginBottom: '0.2rem' }}>
            Ansh Chauhan — Curriculum Vitae
          </h1>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: textMuted }}>
            {pages > 0 ? `${pages} page${pages > 1 ? 's' : ''} · PDF.js renderer` : 'Loading PDF.js…'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>

          {/* ── Zoom controls ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0',
            border: `1px solid ${border}`, borderRadius: '8px', overflow: 'hidden',
          }}>
            <button onClick={zoomOut} title="Zoom out"
              style={{ width: 32, height: 32, background: 'transparent', border: 'none',
                       borderRight: `1px solid ${border}`, color: textMuted, cursor: 'pointer',
                       fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              −
            </button>
            <button onClick={zoomReset} title="Reset zoom"
              style={{ minWidth: 54, height: 32, background: 'transparent', border: 'none',
                       color: accent, cursor: 'pointer',
                       fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                       borderRight: `1px solid ${border}` }}>
              {Math.round(scale * 100)}%
            </button>
            <button onClick={zoomIn} title="Zoom in"
              style={{ width: 32, height: 32, background: 'transparent', border: 'none',
                       color: textMuted, cursor: 'pointer',
                       fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              +
            </button>
          </div>

          {/* Preset zoom buttons */}
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {[0.75, 1.0, 1.5, 2.0].map(z => (
              <button key={z} onClick={() => setScale(z)}
                style={{
                  padding: '0.25rem 0.6rem', borderRadius: '6px', cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.67rem',
                  border: `1px solid ${Math.abs(scale - z) < 0.01 ? accent : border}`,
                  background: Math.abs(scale - z) < 0.01
                    ? isDark ? 'rgba(0,229,255,0.10)' : 'rgba(37,99,235,0.08)'
                    : 'transparent',
                  color: Math.abs(scale - z) < 0.01 ? accent : textMuted,
                  transition: 'all 0.15s',
                }}>
                {Math.round(z * 100)}%
              </button>
            ))}
          </div>

          <CVDownloadButton variant="outline" label="Download" />
        </div>
      </div>

      {/* ── Viewer ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 2rem' }}>

        {/* Chrome strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.5rem 1rem',
          background: bgStrip,
          border: `1px solid ${border}`, borderBottom: 'none',
          borderRadius: '12px 12px 0 0',
        }}>
          {['#ef4444','#f59e0b','#22c55e'].map((c, i) => (
            <span key={i} style={{ width:10, height:10, borderRadius:'50%', background:c, display:'inline-block' }} />
          ))}
          <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.67rem', color:textMuted, marginLeft:'0.25rem' }}>
            AnshChauhan_CV.pdf
          </span>
          <span style={{
            marginLeft:'auto', fontFamily:'JetBrains Mono, monospace', fontSize:'0.62rem', color:accent,
            background: isDark?'rgba(0,229,255,0.08)':'rgba(37,99,235,0.08)',
            padding:'0.15rem 0.6rem', borderRadius:'99px', border:`1px solid ${accent}33`,
          }}>
            {status === 'loading' || status === 'rendering' ? 'rendering…' : status === 'error' ? 'error' : 'live preview'}
          </span>
        </div>

        {/* Canvas wrapper */}
        <div style={{
          border: `1px solid ${border}`,
          borderRadius: '0 0 16px 16px', overflow: 'auto',
          boxShadow: isDark ? '0 12px 48px rgba(0,0,0,0.6)' : '0 6px 30px rgba(37,99,235,0.10)',
          background: isDark ? '#1e1e2e' : '#e5e5e5',
          minHeight: '60vh', maxHeight: '88vh',
          position: 'relative',
        }}>
          {/* Loading overlay */}
          {(status === 'loading' || status === 'rendering') && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '1rem', background: bgCard, zIndex: 10,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                border: `3px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.15)'}`,
                borderTopColor: accent,
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.78rem', color:textMuted }}>
                {status === 'rendering' ? `Rendering at ${Math.round(scale * 100)}%…` : 'Loading PDF.js…'}
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', minHeight:'40vh', gap:'1rem', padding:'2rem',
            }}>
              <span style={{ fontSize:'3rem' }}>📄</span>
              <p style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1rem', color:textBase, textAlign:'center' }}>
                PDF.js failed to load
              </p>
              <p style={{ fontSize:'0.82rem', color:textMuted, maxWidth:'300px', textAlign:'center', lineHeight:1.7 }}>
                Check your internet connection — PDF.js loads from CDN.
              </p>
              <CVDownloadButton variant="primary" label="Download CV Instead" />
            </div>
          )}

          {/* Canvas pages rendered here */}
          <div ref={containerRef} style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }} />
        </div>

        {/* Info strip */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center',
          justifyContent:'space-between', gap:'1rem',
          marginTop:'0.75rem', padding:'0.9rem 1.25rem',
          borderRadius:'12px', border:`1px solid ${border}`, background:bgCard,
        }}>
          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
            {[
              { label:'Email',    value:'iamansh86@gmail.com' },
              { label:'Phone',    value:'+91 9899609856' },
              { label:'GitHub',   value:'Ansh0864' },
              { label:'Location', value:'Delhi, India' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'0.6rem', color:textMuted,
                             textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.18rem' }}>
                  {label}
                </p>
                <p style={{ fontFamily:'IBM Plex Sans, sans-serif', fontSize:'0.83rem',
                             color:isDark?'#cbd5e1':'#334155' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}