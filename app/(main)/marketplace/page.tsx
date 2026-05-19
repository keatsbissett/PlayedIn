import { MARKETPLACE_CATEGORIES } from '@/lib/marketplace/categories'
import Link from 'next/link'

export default function MarketplacePage() {
  const sports = Object.entries(MARKETPLACE_CATEGORIES)

  return (
    <div>
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Buy &amp; Sell</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Browse gear by sport</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sports.map(([slug, sport]) => (
          <Link
            key={slug}
            href={`/marketplace/${slug}`}
            className="card p-5 no-underline transition-all hover:border-border-2"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ background: sport.color }} />
              <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{sport.label}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>
              {sport.categories.length} categories
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
