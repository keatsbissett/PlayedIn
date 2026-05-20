'use client'

import Link from 'next/link'

export function MobileNav() {
  return (
    <header className="flex items-center justify-between px-3.5 h-full w-full" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <Link href="/" className="flex items-center text-lg font-extrabold tracking-tight no-underline">
        <span style={{ color: 'var(--green)' }}>played</span>
        <span style={{ color: 'var(--text)' }}>in</span>
        <span style={{ color: 'var(--green)' }}>.</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/notifications" className="p-1.5" style={{ color: 'var(--text-2)' }}>
          <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z" /><path d="M10.5 21a2 2 0 0 0 3 0" />
          </svg>
        </Link>
        <Link href="/messages" className="p-1.5" style={{ color: 'var(--text-2)' }}>
          <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
