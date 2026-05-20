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
    <div className="card flex items-stretch mb-4" style={{ padding: 0 }}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex-1 flex items-center" style={{ borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <div className="px-5 py-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[20px] font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: s.color }}>{s.value}</span>
              {s.trend && (
                <span className="text-[10px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--green)' }}>{s.trend}</span>
              )}
            </div>
            <div className="text-[11px] font-medium uppercase" style={{ color: 'var(--text-3)', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
