import { createClient } from '@/lib/supabase/server'
import { MARKETPLACE_CATEGORIES, type Sport } from '@/lib/marketplace/categories'
import { formatPrice, SPORT_MAP, timeAgo } from '@/lib/constants'
import { Avatar } from '@/components/shared/Avatar'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { FilterPanel } from '@/components/marketplace/FilterPanel'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

interface ListingFeedPageProps {
  params: Promise<{ sport: string; category: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function ListingFeedPage({ params, searchParams }: ListingFeedPageProps) {
  const { sport, category } = await params
  const sp = await searchParams

  if (!(sport in MARKETPLACE_CATEGORIES)) notFound()

  const sportData = MARKETPLACE_CATEGORIES[sport as Sport]
  const catData = sportData.categories.find(c => c.slug === category)
  if (!catData) notFound()

  const supabase = await createClient()

  let query = supabase
    .from('listings')
    .select('*, seller:profiles!listings_seller_id_fkey(*)')
    .eq('sport', sport)
    .eq('category', category)
    .eq('is_active', true)

  if (sp.prefix) query = query.in('prefix', sp.prefix.split(','))
  if (sp.condition) query = query.in('condition', sp.condition.split(','))
  if (sp.priceMin) query = query.gte('price', parseInt(sp.priceMin) * 100)
  if (sp.priceMax) query = query.lte('price', parseInt(sp.priceMax) * 100)
  if (sp.province) query = query.eq('province', sp.province)
  if (sp.brand) query = query.ilike('brand', `%${sp.brand}%`)
  if (sp.bundle === 'true') query = query.eq('is_bundle', true)

  const sort = sp.sort || 'recent'
  if (sort === 'price_asc') query = query.order('price', { ascending: true, nullsFirst: false })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  else if (sort === 'saves') query = query.order('save_count', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data: listings } = await query.limit(30)

  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--text-3)' }}>
        <Link href="/marketplace" className="no-underline" style={{ color: 'var(--text-3)' }}>Buy &amp; Sell</Link>
        <span>›</span>
        <Link href={`/marketplace/${sport}`} className="no-underline" style={{ color: 'var(--text-3)' }}>{sportData.label}</Link>
        <span>›</span>
        <span style={{ color: 'var(--text-2)' }}>{catData.label}</span>
      </div>

      <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>
        {catData.label}
      </h1>

      <div className="flex gap-4">
        {/* Filter panel */}
        <Suspense>
          <FilterPanel sport={sport} category={category} tags={catData.tags} />
        </Suspense>

        {/* Listing results */}
        <div className="flex-1">
          {(!listings || listings.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>No listings match your filters</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {listings.map((listing: any) => (
                <Link
                  key={listing.id}
                  href={`/marketplace/listing/${listing.id}`}
                  className="card px-4 py-3 no-underline flex items-start gap-3 transition-all hover:border-border-2"
                >
                  {/* Thumbnail placeholder */}
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--bg-3)' }}>
                    <span className="text-lg">📦</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`prefix-tag ${listing.prefix === 'For Sale' ? 'prefix-forsale' : listing.prefix === 'WTB' ? 'prefix-wtb' : listing.prefix === 'Trade' ? 'prefix-trade' : 'prefix-free'}`}>
                        {listing.prefix}
                      </span>
                      {listing.condition && (
                        <span className="text-[10.5px]" style={{ color: 'var(--text-3)' }}>{listing.condition}</span>
                      )}
                      {listing.is_bundle && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,196,122,.14)', color: '#9DD89B' }}>Bundle</span>
                      )}
                    </div>

                    <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{listing.title}</div>
                    <div className="clamp-2 text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{listing.description}</div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Avatar name={listing.seller?.display_name || 'User'} url={listing.seller?.avatar_url} size={18} />
                        <span className="text-[11px]" style={{ color: 'var(--text-3)' }}>{listing.seller?.display_name}</span>
                        <TrustBadge tier={listing.seller?.trust_tier || 'community'} />
                      </div>
                      <div className="flex items-center gap-3">
                        {listing.price !== null && (
                          <span className="text-sm font-bold font-mono" style={{ color: 'var(--orange)' }}>
                            {formatPrice(listing.price)}
                          </span>
                        )}
                        <span className="text-[10.5px] font-mono" style={{ color: 'var(--text-3)' }}>{timeAgo(listing.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
