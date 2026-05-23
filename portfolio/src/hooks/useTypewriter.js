import { useState, useEffect } from 'react'

export default function useTypewriter(words, typingSpeed = 60, deletingSpeed = 28, pause = 1900) {
  const [idx,       setIdx]       = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const target = words[idx]
    let t
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), typingSpeed)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), pause)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
    else { setDeleting(false); setIdx(i => (i + 1) % words.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, idx, words, typingSpeed, deletingSpeed, pause])

  return displayed
}