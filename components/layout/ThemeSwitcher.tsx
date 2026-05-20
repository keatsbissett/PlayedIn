'use client'

import { useState, useEffect, useRef } from 'react'
import { THEMES, THEME_GROUPS } from '@/lib/themes'

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState('forest-dark')
  const ref = useRef<HTMLDivElement>(null)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('playedin-theme') || 'forest-dark'
    setActiveTheme(saved)
    applyTheme(saved)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function applyTheme(themeId: string) {
    const theme = THEMES.find(t => t.id === themeId)
    if (!theme) return
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  function selectTheme(themeId: string) {
    setActiveTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem('playedin-theme', themeId)
    setOpen(false)
  }

  const current = THEMES.find(t => t.id === activeTheme)

  return (
    <div ref={ref} className="theme-switcher">
      <button
        className="theme-switcher-btn"
        onClick={() => setOpen(o => !o)}
        title="Change theme"
      >
        <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <span className="theme-switcher-label">{current?.name || 'Theme'}</span>
        <svg style={{ width: 12, height: 12, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .15s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="theme-dropdown">
          {THEME_GROUPS.map(group => (
            <div key={group} className="theme-group">
              <div className="theme-group-label">{group}</div>
              {THEMES.filter(t => t.group === group).map(theme => (
                <button
                  key={theme.id}
                  className={`theme-option ${activeTheme === theme.id ? 'active' : ''}`}
                  onClick={() => selectTheme(theme.id)}
                >
                  <span className="theme-swatch">
                    <span style={{ background: theme.vars['--bg'], width: 8, height: 16, display: 'block' }} />
                    <span style={{ background: theme.vars['--green'], width: 8, height: 16, display: 'block' }} />
                    <span style={{ background: theme.vars['--bg-2'], width: 8, height: 16, display: 'block' }} />
                  </span>
                  <span className="theme-option-name">{theme.name}</span>
                  {activeTheme === theme.id && (
                    <svg className="theme-check" style={{ width: 14, height: 14, color: 'var(--green)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
