'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SPORTS } from '@/lib/constants'

export function SportTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSport = searchParams.get('sport')

  function handleClick(sport: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (sport) {
      params.set('sport', sport)
    } else {
      params.delete('sport')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
      <button
        className={`tab-pill ${!activeSport ? 'active' : ''}`}
        onClick={() => handleClick(null)}
      >
        All sports
      </button>
      {SPORTS.map(s => (
        <button
          key={s.id}
          className={`tab-pill tab-pill-sport ${activeSport === s.id ? `active ${s.tabClass}` : ''}`}
          onClick={() => handleClick(s.id)}
        >
          {s.name}
        </button>
      ))}
    </div>
  )
}
