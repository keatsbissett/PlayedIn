import { createClient } from '@/lib/supabase/server'
import { SPORT_MAP } from '@/lib/constants'
import { LiveDot } from '@/components/shared/LiveDot'

export async function RightSidebar() {
  const supabase = await createClient()

  const { data: trending } = await supabase
    .from('threads')
    .select('id, sport, title, reply_count')
    .order('reply_count', { ascending: false })
    .limit(5)

  return (
    <aside className="hidden xl:flex flex-col overflow-y-auto py-4 px-4 gap-4" style={{ background: 'var(--bg)', borderLeft: '1px solid var(--border)', width: 336 }}>
      {/* Trending Panel */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <LiveDot size={7} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Trending now</span>
          <span className="ml-auto text-[10.5px]" style={{ color: 'var(--text-3)' }}>Last 24h</span>
        </div>
        <div className="flex flex-col gap-0">
          {(trending || []).map((t, i) => {
            const sport = SPORT_MAP[t.sport]
            return (
              <div
                key={t.id}
                className="flex items-start gap-2.5 py-2"
                style={{ borderLeft: `2px solid ${sport?.hex || 'var(--border)'}`, paddingLeft: 10 }}
              >
                <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-3)', minWidth: 16 }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`pill ${sport?.pillClass || ''}`} style={{ fontSize: 9.5, padding: '1px 6px' }}>{sport?.name}</span>
                  </div>
                  <div className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{t.title}</div>
                  <div className="text-[10.5px] mt-0.5" style={{ color: 'var(--text-3)' }}>{t.reply_count} replies</div>
                </div>
              </div>
            )
          })}
          {(!trending || trending.length === 0) && (
            <p className="text-xs py-2" style={{ color: 'var(--text-3)' }}>No trending threads yet</p>
          )}
        </div>
      </div>

      {/* Featured Club placeholder */}
      <div className="card p-4">
        <div className="text-[10.5px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>Featured club</div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>Partner clubs appear here</p>
      </div>

      {/* Roadmap */}
      <div className="card p-4">
        <div className="text-[10.5px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>Roadmap</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span style={{ color: 'var(--text-2)' }}>Club directory launch</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
            <span style={{ color: 'var(--text-2)' }}>Trade reputation system</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)' }} />
            <span style={{ color: 'var(--text-2)' }}>Event calendar</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
