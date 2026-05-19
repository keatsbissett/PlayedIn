import { createClient } from '@/lib/supabase/server'
import { formatPrice, SPORT_MAP } from '@/lib/constants'
import Link from 'next/link'

export async function MarketplacePreviewStrip() {
  const supabase = await createClient()

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { data: listings } = await supabase
    .from('listings')
    .select('id, title, price, sport, prefix, save_count, condition')
    .eq('is_active', true)
    .eq('is_sold', false)
    .gte('created_at', weekAgo)
    .order('save_count', { ascending: false })
    .limit(3)

  return (
    <div className="card p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          🔥 Hot right now in Buy &amp; Sell
        </span>
        <Link href="/marketplace" className="text-xs font-medium" style={{ color: 'var(--green)' }}>
          View all →
        </Link>
      </div>

      {(!listings || listings.length < 3) ? (
        <Link
          href="/marketplace"
          className="block text-center py-6 no-underline"
        >
          <span className="text-sm font-medium" style={{ color: 'var(--green)' }}>
            Be the first to list something →
          </span>
        </Link>
      ) : (
        <div className="grid grid-cols-3 gap-2.5">
          {listings.map(l => {
            const sport = SPORT_MAP[l.sport]
            return (
              <Link
                key={l.id}
                href={`/marketplace/listing/${l.id}`}
                className="rounded-lg p-3 no-underline transition-all hover:bg-bg-3"
                style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`pill ${sport?.pillClass || ''}`} style={{ fontSize: 9, padding: '1px 5px' }}>{sport?.name}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>{l.condition}</span>
                </div>
                <div className="text-xs font-medium truncate mb-1" style={{ color: 'var(--text)' }}>{l.title}</div>
                {l.price !== null && (
                  <div className="text-sm font-bold font-mono" style={{ color: 'var(--orange)' }}>
                    {formatPrice(l.price)}
                  </div>
                )}
                {l.price === null && (
                  <div className="text-xs font-medium" style={{ color: 'var(--teal)' }}>{l.prefix}</div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
