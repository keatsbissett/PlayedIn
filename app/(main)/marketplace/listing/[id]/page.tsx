import { createClient } from '@/lib/supabase/server'
import { formatPrice, timeAgo, SPORT_MAP } from '@/lib/constants'
import { Avatar } from '@/components/shared/Avatar'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { PrefixTag } from '@/components/shared/PrefixTag'
import { SportPill } from '@/components/shared/SportPill'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ListingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from('listings')
    .select('*, seller:profiles!listings_seller_id_fkey(*)')
    .eq('id', id)
    .single()

  if (!listing) notFound()

  const seller = listing.seller as any

  return (
    <div>
      <Link href="/marketplace" className="flex items-center gap-1.5 text-xs font-medium mb-4 no-underline" style={{ color: 'var(--text-3)' }}>
        <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to marketplace
      </Link>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <PrefixTag prefix={listing.prefix} />
          <SportPill sport={listing.sport} />
          {listing.condition && (
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{listing.condition}</span>
          )}
          {listing.is_bundle && (
            <span className="text-[10.5px] px-2 py-0.5 rounded" style={{ background: 'rgba(124,196,122,.14)', color: '#9DD89B' }}>
              Bundle · {listing.item_count} items
            </span>
          )}
        </div>

        <h1 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>{listing.title}</h1>

        {listing.price !== null && (
          <div className="text-2xl font-bold font-mono mb-4" style={{ color: 'var(--orange)' }}>
            {formatPrice(listing.price)}
          </div>
        )}

        <div className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>
          {listing.description}
        </div>

        {/* Seller info */}
        <div className="py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <Avatar name={seller?.display_name || 'User'} url={seller?.avatar_url} size={40} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{seller?.display_name}</span>
                <TrustBadge tier={seller?.trust_tier || 'community'} />
              </div>
              <div className="text-xs" style={{ color: 'var(--text-3)' }}>
                {listing.location} · {seller?.trade_count || 0} trades · Posted {timeAgo(listing.created_at)}
              </div>
            </div>
            <div className="ml-auto">
              <button className="btn-primary">Message seller</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
