import { createClient } from '@/lib/supabase/server'
import { SPORT_MAP } from '@/lib/constants'

export default async function ClubsPage() {
  const supabase = await createClient()
  const { data: clubs } = await supabase
    .from('clubs')
    .select('*')
    .order('is_verified', { ascending: false })
    .order('rating', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Find a club</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Clubs, courts, and venues across South Africa</p>

      <div className="flex flex-col gap-2.5">
        {(clubs || []).map(club => {
          const sport = SPORT_MAP[club.sport]
          return (
            <div key={club.id} className="card px-4 py-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg-3)' }}>
                <span className="text-xl">📍</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{club.name}</span>
                  {club.is_verified && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(212,168,67,.16)', color: '#E2BC68' }}>Verified</span>
                  )}
                  {club.is_safe_trade_location && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(124,196,122,.14)', color: '#9DD89B' }}>Verified meetup spot</span>
                  )}
                </div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>
                  {club.location} · {club.province}
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-3)' }}>
                  <span className={`pill ${sport?.pillClass || ''}`} style={{ fontSize: 9.5, padding: '1px 6px' }}>{sport?.name}</span>
                  <span>{club.member_count} members</span>
                  <span>⭐ {Number(club.rating).toFixed(1)}</span>
                  {club.courts_count > 0 && <span>{club.courts_count} courts</span>}
                </div>
              </div>
              {club.booking_url && (
                <a href={club.booking_url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs flex-shrink-0">
                  Book
                </a>
              )}
            </div>
          )
        })}
        {(!clubs || clubs.length === 0) && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>No clubs listed yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
