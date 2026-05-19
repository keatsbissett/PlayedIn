'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/', label: 'Home', icon: (c: string) => <svg style={{ width: 22, height: 22, color: c }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" /></svg> },
  { href: '/whats-new', label: 'New', icon: (c: string) => <svg style={{ width: 22, height: 22, color: c }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14 9l7 2-7 2-2 9-2-9-7-2 7-2 2-7Z" /></svg> },
  { href: '/marketplace', label: 'Market', icon: (c: string) => <svg style={{ width: 22, height: 22, color: c }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16l-1.2 4.2a3 3 0 0 1-2.9 2.2H8.1a3 3 0 0 1-2.9-2.2L4 7Z" /><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /><path d="M5 14v6h14v-6" /></svg> },
  { href: '/clubs', label: 'Clubs', icon: (c: string) => <svg style={{ width: 22, height: 22, color: c }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg> },
  { href: '/profile', label: 'Profile', icon: (c: string) => <svg style={{ width: 22, height: 22, color: c }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg> },
]

export function MobileTabbar() {
  const pathname = usePathname()

  return (
    <nav className="flex lg:hidden items-center justify-around py-1" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      {TABS.map(tab => {
        const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-0.5 py-1 px-3 no-underline"
          >
            {tab.icon(active ? 'var(--green)' : 'var(--text-3)')}
            <span className="text-[10px] font-medium" style={{ color: active ? 'var(--green)' : 'var(--text-3)' }}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
