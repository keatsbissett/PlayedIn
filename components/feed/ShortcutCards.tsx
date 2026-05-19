import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

interface ShortcutCardsProps {
  activeSport: string | null
  lastVisitedAt: string | null
  userProvince: string | null
}

export async function ShortcutCards({ activeSport, lastVisitedAt, userProvince }: ShortcutCardsProps) {
  const supabase = await createClient()

  let chatSubtext = '847 active discussions'
  let marketSubtext = '12 new listings today'
  let clubSubtext = '12 verified partners'
  let coachSubtext = 'Coming soon'

  try {
    if (lastVisitedAt) {
      const { count } = await supabase
        .from('threads')
        .select('*', { count: 'exact', head: true })
        .gt('created_at', lastVisitedAt)
      if (count && count > 0) chatSubtext = `${count} new posts since your last visit`
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let listingQuery = supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString())
      .eq('is_active', true)
    if (activeSport) listingQuery = listingQuery.eq('sport', activeSport)
    const { count: listingCount } = await listingQuery
    if (listingCount !== null) {
      marketSubtext = `${listingCount} new ${activeSport || ''} listings today`
    }

    if (userProvince) {
      const { data: club } = await supabase
        .from('clubs')
        .select('name')
        .eq('is_verified', true)
        .eq('province', userProvince)
        .limit(1)
        .single()
      if (club) clubSubtext = `${club.name} — courts available`
    }
  } catch {
    // Fall through to defaults
  }

  const cards = [
    { label: 'Community chat', sub: chatSubtext, href: '/', icon: '💬' },
    { label: 'Buy & Sell', sub: marketSubtext, href: '/marketplace', icon: '🏷️' },
    { label: 'Find a club', sub: clubSubtext, href: '/clubs', icon: '📍' },
    { label: 'Coaches', sub: coachSubtext, href: '#', icon: '🎓' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
      {cards.map(c => (
        <Link
          key={c.label}
          href={c.href}
          className="card px-3.5 py-3 no-underline transition-all hover:border-border-2"
        >
          <div className="text-lg mb-1">{c.icon}</div>
          <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{c.label}</div>
          <div className="text-[10.5px]" style={{ color: 'var(--text-3)' }}>{c.sub}</div>
        </Link>
      ))}
    </div>
  )
}
