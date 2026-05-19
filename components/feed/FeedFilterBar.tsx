'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const FILTERS = [
  { id: 'latest', label: 'Latest' },
  { id: 'trending', label: 'Trending' },
  { id: 'following', label: 'Following' },
  { id: 'unread', label: 'Unread' },
]

export function FeedFilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'latest'

  function handleClick(filter: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === 'latest') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1 mb-3">
      {FILTERS.map(f => (
        <button
          key={f.id}
          className={`tab-pill ${activeFilter === f.id ? 'active' : ''}`}
          style={{ fontSize: 12, padding: '5px 12px' }}
          onClick={() => handleClick(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
