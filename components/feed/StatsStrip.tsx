import { createClient } from '@/lib/supabase/server'

export async function StatsStrip() {
  const supabase = await createClient()

  const [{ count: memberCount }, { count: postCount }, { count: tradeCount }, { count: clubCount }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('threads').select('*', { count: 'exact', head: true }),
    supabase.from('trades').select('*', { count: 'exact', head: true }),
    supabase.from('clubs').select('*', { count: 'exact', head: true }).eq('is_verified', true),
  ])

  const stats = [
    { value: memberCount || 0, label: 'MEMBERS', color: 'var(--green)' },
    { value: postCount || 0, label: 'POSTS', color: 'var(--text)' },
    { value: tradeCount || 0, label: 'TRADES', color: 'var(--orange)', trend: '↑ 12%' },
    { value: clubCount || 0, label: 'PARTNER CLUBS', color: 'var(--gold)' },
  ]

  return (
    <div className="card flex items-center px-5 py-3 mb-4">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center">
          {i > 0 && <div className="w-px h-8 mx-4" style={{ background: 'var(--border)' }} />}
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
              {s.trend && (
                <span className="text-[10px] font-mono font-medium" style={{ color: 'var(--green)' }}>{s.trend}</span>
              )}
            </div>
            <div className="text-[11px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
