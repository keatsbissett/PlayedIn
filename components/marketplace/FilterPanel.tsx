'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { LISTING_PREFIXES, LISTING_CONDITIONS, PROVINCES } from '@/lib/constants'

interface FilterPanelProps {
  sport: string
  category: string
  tags: readonly string[]
}

export function FilterPanel({ sport, category, tags }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/marketplace/${sport}/${category}?${params.toString()}`)
  }

  return (
    <div className="hidden lg:block w-[220px] flex-shrink-0">
      <div className="card p-4 sticky top-4">
        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)' }}>Filters</div>

        {/* Keywords */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Keywords</label>
          <input
            className="input-base text-xs"
            placeholder="Search…"
            defaultValue={searchParams.get('keywords') || ''}
            onBlur={e => setParam('keywords', e.target.value)}
          />
        </div>

        {/* Type */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Type</label>
          <select
            className="input-base text-xs"
            value={searchParams.get('prefix') || ''}
            onChange={e => setParam('prefix', e.target.value)}
          >
            <option value="">All</option>
            {LISTING_PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Condition */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Condition</label>
          <select
            className="input-base text-xs"
            value={searchParams.get('condition') || ''}
            onChange={e => setParam('condition', e.target.value)}
          >
            <option value="">Any</option>
            {LISTING_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price range */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Price (ZAR)</label>
          <div className="flex gap-2">
            <input
              className="input-base text-xs"
              placeholder="Min"
              type="number"
              defaultValue={searchParams.get('priceMin') || ''}
              onBlur={e => setParam('priceMin', e.target.value)}
            />
            <input
              className="input-base text-xs"
              placeholder="Max"
              type="number"
              defaultValue={searchParams.get('priceMax') || ''}
              onBlur={e => setParam('priceMax', e.target.value)}
            />
          </div>
        </div>

        {/* Province */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Province</label>
          <select
            className="input-base text-xs"
            value={searchParams.get('province') || ''}
            onChange={e => setParam('province', e.target.value)}
          >
            <option value="">All provinces</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Brand */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Brand</label>
          <input
            className="input-base text-xs"
            placeholder="Any brand"
            defaultValue={searchParams.get('brand') || ''}
            onBlur={e => setParam('brand', e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="mb-3">
          <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-2)' }}>Sort by</label>
          <select
            className="input-base text-xs"
            value={searchParams.get('sort') || 'recent'}
            onChange={e => setParam('sort', e.target.value)}
          >
            <option value="recent">Most recent</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="saves">Most saved</option>
          </select>
        </div>

        {/* Bundle filter */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={searchParams.get('bundle') === 'true'}
            onChange={e => setParam('bundle', e.target.checked ? 'true' : '')}
            className="accent-green"
          />
          <span className="text-xs" style={{ color: 'var(--text-2)' }}>Bundles only</span>
        </label>
      </div>
    </div>
  )
}
