import { useEffect, useRef, useState } from 'react'
import './App.css'

const SPOTIFY_URL =
  'https://open.spotify.com/intl-pt/track/3XqM8hLCEYlbnFjoWwqtFv?si=349dd584a14c4ceb'

function App() {
  const playgroundRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })

  const moveNoButton = () => {
    const area = playgroundRef.current
    const btn = noButtonRef.current
    if (!area || !btn) return

    const areaRect = area.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const padding = 8
    const maxX = Math.max(padding, areaRect.width - btnRect.width - padding)
    const maxY = Math.max(padding, areaRect.height - btnRect.height - padding)
    const nextX = Math.random() * maxX
    const nextY = Math.random() * maxY

    setNoPos({ x: nextX, y: nextY })
  }

  useEffect(() => {
    moveNoButton()
  }, [])

  useEffect(() => {
    const handleResize = () => moveNoButton()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="page">
      <div className="card">
        <p className="eyebrow">Uma perguntinha importante</p>
        <h1>
          Casa comigo?
          <span>Por favor</span>
        </h1>
        <p className="subtitle">
          Prometo cuidar de você, rir das mesmas besteiras e segurar sua mão em
          todas as aventuras.
        </p>

        <div className="playground" ref={playgroundRef}>
          <div className="actions">
            <button
              className="btn yes"
              onClick={() =>
                window.open(SPOTIFY_URL, '_blank', 'noopener,noreferrer')
              }
            >
              Sim
            </button>
          </div>
          <button
            className="btn no"
            ref={noButtonRef}
            style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
          >
            Não
          </button>
        </div>

        <p className="hint">
          Dica: o “não” é tímido e vive fugindo.
        </p>
      </div>
    </div>
  )
}

export default App
