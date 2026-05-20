import Link from 'next/link'
import { ThemeSwitcher } from './ThemeSwitcher'

export function TopBanner() {
  return (
    <div className="top-banner">
      <div className="top-banner-inner">
        {/* Left: small icon as home anchor */}
        <Link href="/" className="top-banner-home no-underline">
          <span className="top-banner-icon-sm">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="rgba(124,196,122,.15)" />
              <path d="M12 28V14l8-4 8 4v14l-8 4-8-4Z" stroke="var(--green)" strokeWidth="1.8" fill="none" />
              <path d="M12 14l8 4 8-4" stroke="var(--green)" strokeWidth="1.8" />
              <path d="M20 18v10" stroke="var(--green)" strokeWidth="1.8" />
              <circle cx="20" cy="14" r="2.5" fill="var(--green)" />
            </svg>
          </span>
        </Link>

        {/* Center: big hero logo */}
        <Link href="/" className="top-banner-center no-underline">
          <span className="top-banner-center-icon">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="14" fill="rgba(124,196,122,.12)" />
              <path d="M16 40V20l12-6 12 6v20l-12 6-12-6Z" stroke="var(--green)" strokeWidth="2" fill="rgba(124,196,122,.06)" />
              <path d="M16 20l12 6 12-6" stroke="var(--green)" strokeWidth="2" />
              <path d="M28 26v14" stroke="var(--green)" strokeWidth="2" />
              <circle cx="28" cy="20" r="3" fill="var(--green)" />
              <circle cx="20" cy="30" r="1.5" fill="var(--green)" opacity=".5" />
              <circle cx="36" cy="30" r="1.5" fill="var(--green)" opacity=".5" />
            </svg>
          </span>
          <div className="top-banner-center-text">
            <span className="top-banner-center-name">
              <span style={{ color: 'var(--green)' }}>played</span>
              <span style={{ color: 'var(--text)' }}>in</span>
              <span style={{ color: 'var(--green)' }}>.</span>
            </span>
            <span className="top-banner-center-tagline">South Africa&apos;s Sport Community</span>
          </div>
        </Link>

        {/* Right: nav links + theme switcher */}
        <div className="top-banner-right">
          <nav className="top-banner-nav">
            <Link href="/" className="top-banner-link">Forums</Link>
            <Link href="/marketplace" className="top-banner-link">Buy &amp; Sell</Link>
            <Link href="/clubs" className="top-banner-link">Clubs</Link>
            <Link href="/whats-new" className="top-banner-link">What&apos;s New</Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
