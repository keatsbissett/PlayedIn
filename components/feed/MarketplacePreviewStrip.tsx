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
    <div className="card px-4 py-3 mb-3">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
          🔥 Hot right now in Buy &amp; Sell
        </span>
        <Link href="/marketplace" className="text-[11px] font-medium no-underline" style={{ color: 'var(--green)' }}>
          View all →
        </Link>
      </div>

      {(!listings || listings.length < 3) ? (
        <Link
          href="/marketplace"
          className="flex items-center justify-center py-4 rounded-lg no-underline"
          style={{ background: 'var(--bg-3)', border: '1px dashed var(--border)' }}
        >
          <span className="text-[12.5px] font-medium" style={{ color: 'var(--green)' }}>
            Be the first to list something →
          </span>
        </Link>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {listings.map(l => {
            const sport = SPORT_MAP[l.sport]
            return (
              <Link
                key={l.id}
                href={`/marketplace/listing/${l.id}`}
                className="rounded-lg p-2.5 no-underline transition-all hover:border-border-2"
                style={{ background: 'var(--bg-3)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`pill ${sport?.pillClass || ''}`} style={{ fontSize: 9, padding: '1px 5px' }}>{sport?.name}</span>
                  <span className="text-[9.5px]" style={{ color: 'var(--text-3)' }}>{l.condition}</span>
                </div>
                <div className="text-[11.5px] font-medium truncate mb-1" style={{ color: 'var(--text)' }}>{l.title}</div>
                {l.price !== null ? (
                  <div className="text-[13px] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--orange)' }}>
                    {formatPrice(l.price)}
                  </div>
                ) : (
                  <div className="text-[11px] font-medium" style={{ color: 'var(--teal)' }}>{l.prefix}</div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
