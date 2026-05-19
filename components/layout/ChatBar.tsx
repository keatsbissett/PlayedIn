'use client'

import { useState, useEffect, useRef } from 'react'
import { CHAT_CHANNELS, SPORT_MAP } from '@/lib/constants'

const TICKER_MESSAGES = [
  { sport: 'padel', text: 'Divesh listed a Babolat Counter Veron · Padel' },
  { sport: 'golf', text: 'Marike posted in Selborne member-guest thread · Golf' },
  { sport: 'padel', text: 'Sipho is looking for a 4th at Umhlanga · Padel' },
  { sport: 'running', text: 'Keaton replied in "Two Oceans entry transfers"' },
  { sport: 'cycling', text: 'Ben listed a Specialized Diverge frameset · Trade' },
]

export function ChatBar() {
  const [activeChannel, setActiveChannel] = useState<string>(CHAT_CHANNELS[0].id)
  const [tickerIdx, setTickerIdx] = useState(0)
  const [inputFocused, setInputFocused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (inputFocused) return
    timerRef.current = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_MESSAGES.length)
    }, 3200)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [inputFocused])

  const channel = CHAT_CHANNELS.find(c => c.id === activeChannel)
  const ticker = TICKER_MESSAGES[tickerIdx]
  const tickerColor = SPORT_MAP[ticker.sport]?.hex || 'var(--text-3)'

  return (
    <div className="flex items-center h-[54px] px-4 gap-3.5" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      {/* Channel selector */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs">💬</span>
        <select
          value={activeChannel}
          onChange={e => setActiveChannel(e.target.value)}
          className="text-xs font-semibold bg-transparent border-none outline-none cursor-pointer"
          style={{ color: 'var(--text)' }}
        >
          {CHAT_CHANNELS.map(ch => (
            <option key={ch.id} value={ch.id} style={{ background: 'var(--bg-2)' }}>{ch.label}</option>
          ))}
        </select>
        <span className="text-[10.5px] font-mono" style={{ color: 'var(--text-3)' }}>0 online</span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 flex-shrink-0" style={{ background: 'var(--border)' }} />

      {/* Ticker */}
      <div className="flex-1 min-w-0 relative h-[18px] overflow-hidden">
        <div
          key={tickerIdx}
          className="absolute inset-0 flex items-center gap-1.5 text-xs truncate"
          style={{ color: 'var(--text-3)', animation: 'ticker-in .5s ease-out' }}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tickerColor }} />
          {ticker.text}
        </div>
      </div>

      {/* Join link */}
      <button
        className="flex-shrink-0 text-xs font-semibold"
        style={{ color: 'var(--green)' }}
      >
        Join the conversation
      </button>
    </div>
  )
}
