/**
 * useCVDownload — 100% reliable PDF download
 * ────────────────────────────────────────────
 * Uses the embedded base64 PDF (src/data/cvBase64.js).
 * Zero server requests, works on Vercel / Netlify / Render / localhost.
 */
import { useState } from 'react'
import CV_BASE64 from '../data/cvBase64'

function b64toBlob(b64, mime = 'application/pdf') {
  const bytes = atob(b64)
  const arr   = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

export default function useCVDownload() {
  const [status, setStatus] = useState('idle') // idle | loading | done

  const download = (fileName = 'AnshChauhan_CV.pdf') => {
    if (status === 'loading') return
    setStatus('loading')

    try {
      const blob    = b64toBlob(CV_BASE64)
      const url     = URL.createObjectURL(blob)
      const anchor  = document.createElement('a')
      anchor.href   = url
      anchor.download = fileName
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      setTimeout(() => {
        document.body.removeChild(anchor)
        URL.revokeObjectURL(url)
      }, 300)
      setStatus('done')
    } catch (e) {
      // Last-resort fallback: open the public file in a new tab
      console.warn('Blob failed, opening PDF in new tab', e)
      window.open('/AnshChauhan_CV.pdf', '_blank')
      setStatus('done')
    }

    setTimeout(() => setStatus('idle'), 3000)
  }

  return { download, status }
}