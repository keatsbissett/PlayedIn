'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SPORTS } from '@/lib/constants'
import { Avatar } from '@/components/shared/Avatar'
import type { Profile } from '@/lib/types/database.types'

interface LeftSidebarProps {
  profile: Profile | null
  newSinceLastVisit?: number
}

export function LeftSidebar({ profile, newSinceLastVisit = 0 }: LeftSidebarProps) {
  const pathname = usePathname()
  const [communityOpen, setCommunityOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  return (
    <aside className="flex flex-col h-full py-3.5 px-3">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-0 px-2 pb-1.5 text-xl font-extrabold tracking-tight no-underline">
        <span style={{ color: 'var(--green)' }}>played</span>
        <span style={{ color: 'var(--text)' }}>in</span>
        <span style={{ color: 'var(--green)' }}>.</span>
      </Link>

      {/* Search */}
      <div className="relative mx-1 mt-2 mb-3">
        <svg className="absolute left-2.5 top-2" style={{ width: 15, height: 15, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="input-base"
          placeholder="Search PlayedIn…"
          style={{ paddingLeft: 32, fontSize: 12.5, height: 34 }}
        />
      </div>

      {/* Main nav */}
      <div className="section-label">Main</div>
      <nav className="flex flex-col gap-0.5">
        <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: isActive('/') ? 'var(--green)' : 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
          </svg>
          Home
        </Link>

        <Link href="/whats-new" className={`nav-item ${isActive('/whats-new') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: isActive('/whats-new') ? 'var(--green)' : 'var(--text-3)' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 14 9l7 2-7 2-2 9-2-9-7-2 7-2 2-7Z" />
          </svg>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span>What&apos;s New</span>
              {newSinceLastVisit > 0 && (
                <span className="text-xs font-bold" style={{ color: 'var(--green)' }}>{newSinceLastVisit}</span>
              )}
            </div>
            <div className="text-[10px]" style={{ color: 'var(--text-3)', marginTop: 1 }}>Since your last visit</div>
          </div>
        </Link>

        {/* Community with sport sub-nav */}
        <button
          className={`nav-item w-full ${pathname.startsWith('/community') ? 'active' : ''}`}
          onClick={() => setCommunityOpen(o => !o)}
        >
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="9.5" r="2.6" /><path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" /><path d="M15 18c0-2.2 1.8-4 4-4s2 0 2 0" />
          </svg>
          <span className="flex-1 text-left">Community</span>
          <svg style={{ width: 14, height: 14, transform: communityOpen ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform .15s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        {communityOpen && (
          <div className="pl-3.5 mt-0.5 mb-1 flex flex-col gap-0.5">
            {SPORTS.map(s => (
              <Link key={s.id} href={`/?sport=${s.id}`} className="nav-item text-[12.5px] py-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.hex }} />
                {s.name}
              </Link>
            ))}
          </div>
        )}

        <Link href="/marketplace" className={`nav-item ${pathname.startsWith('/marketplace') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: pathname.startsWith('/marketplace') ? 'var(--green)' : 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16l-1.2 4.2a3 3 0 0 1-2.9 2.2H8.1a3 3 0 0 1-2.9-2.2L4 7Z" /><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /><path d="M5 14v6h14v-6" />
          </svg>
          Buy &amp; Sell
        </Link>

        <Link href="/clubs" className={`nav-item ${isActive('/clubs') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: isActive('/clubs') ? 'var(--green)' : 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
          </svg>
          Find a club
        </Link>
      </nav>

      {/* Personal */}
      <div className="section-label mt-3">Personal</div>
      <nav className="flex flex-col gap-0.5">
        <Link href="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
          Profile
        </Link>
        <Link href="/messages" className={`nav-item ${isActive('/messages') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
          </svg>
          Messages
        </Link>
        <Link href="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
          <svg className="flex-shrink-0" style={{ width: 18, height: 18, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z" /><path d="M10.5 21a2 2 0 0 0 3 0" />
          </svg>
          Notifications
        </Link>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User info */}
      {profile && (
        <div className="flex items-center gap-2.5 px-2.5 py-2 mt-2 rounded-lg" style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
          <Avatar name={profile.display_name} url={profile.avatar_url} size={32} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{profile.display_name}</div>
            <div className="text-[10.5px] truncate" style={{ color: 'var(--text-3)' }}>{profile.location || 'South Africa'}</div>
          </div>
        </div>
      )}
    </aside>
  )
}
