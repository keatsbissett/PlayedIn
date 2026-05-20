import { createClient } from '@/lib/supabase/server'
import { SPORT_MAP } from '@/lib/constants'
import { LiveDot } from '@/components/shared/LiveDot'
import { Avatar } from '@/components/shared/Avatar'

export async function RightSidebar() {
  const supabase = await createClient()

  const { data: trending } = await supabase
    .from('threads')
    .select('id, sport, title, reply_count')
    .order('reply_count', { ascending: false })
    .limit(5)

  const { data: onlineProfiles } = await supabase
    .from('profiles')
    .select('id, display_name, location, avatar_url')
    .order('last_visited_at', { ascending: false })
    .limit(8)

  return (
    <>
      {/* Trending Panel */}
      <div className="card p-4 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <LiveDot size={7} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Trending now</span>
          <span className="ml-auto text-[10.5px]" style={{ color: 'var(--text-3)' }}>Last 24h</span>
        </div>
        <div className="flex flex-col">
          {(trending || []).map((t, i) => {
            const sport = SPORT_MAP[t.sport]
            return (
              <div
                key={t.id}
                className="flex items-start gap-2.5 py-2.5"
                style={{ borderLeft: `2px solid ${sport?.hex || 'var(--border)'}`, paddingLeft: 10 }}
              >
                <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-3)', minWidth: 16 }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`pill ${sport?.pillClass || ''}`} style={{ fontSize: 9.5, padding: '1px 6px' }}>{sport?.name}</span>
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text)', lineHeight: 1.35 }}>{t.title}</div>
                  <div className="text-[10.5px] mt-0.5 font-mono" style={{ color: 'var(--text-3)' }}>{t.reply_count} replies</div>
                </div>
              </div>
            )
          })}
          {(!trending || trending.length === 0) && (
            <p className="text-xs py-3 text-center" style={{ color: 'var(--text-3)' }}>No trending threads yet</p>
          )}
        </div>
      </div>

      {/* Who's Online */}
      <div className="card p-4 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }} />
          <span className="text-[10.5px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Who&apos;s online</span>
          <span className="ml-auto text-[10.5px] font-mono" style={{ color: 'var(--green)' }}>{onlineProfiles?.length || 0}</span>
        </div>
        <div className="flex flex-col gap-2">
          {(onlineProfiles || []).map(p => (
            <div key={p.id} className="flex items-center gap-2">
              <div className="relative">
                <Avatar name={p.display_name} url={p.avatar_url} size={24} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[var(--bg-2)]" style={{ background: 'var(--green)' }} />
              </div>
              <span className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{p.display_name}</span>
              {p.location && (
                <span className="text-[10px] ml-auto flex-shrink-0" style={{ color: 'var(--text-3)' }}>{p.location}</span>
              )}
            </div>
          ))}
          {(!onlineProfiles || onlineProfiles.length === 0) && (
            <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>No one online</p>
          )}
        </div>
      </div>

      {/* Featured Club */}
      <div className="card p-4 mb-3">
        <div className="text-[10.5px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-3)' }}>Featured club</div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,196,122,.14)' }}>
            <span style={{ fontSize: 16 }}>🏟️</span>
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Westville Padel Lab</div>
            <div className="text-[10.5px]" style={{ color: 'var(--text-3)' }}>Westville, KZN · 6 courts</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10.5px]" style={{ color: 'var(--text-3)' }}>
          <span className="pill pill-padel" style={{ fontSize: 9, padding: '1px 5px' }}>Padel</span>
          <span>842 members</span>
          <span>⭐ 4.8</span>
        </div>
        <button className="btn-ghost w-full mt-3 text-xs">View club</button>
      </div>

      {/* Roadmap */}
      <div className="card p-4 mb-3">
        <div className="text-[10.5px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-3)' }}>Roadmap</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
            <span style={{ color: 'var(--text-2)' }}>Club directory launch</span>
            <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--green)' }}>Soon</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
            <span style={{ color: 'var(--text-2)' }}>Trade reputation system</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--teal)' }} />
            <span style={{ color: 'var(--text-2)' }}>Event calendar</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--orange)' }} />
            <span style={{ color: 'var(--text-2)' }}>Coach directory</span>
          </div>
        </div>
      </div>

      {/* Sponsor — last, dismissable */}
      <div className="card p-4 relative" style={{ background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--bg-3) 100%)' }}>
        <div className="text-[10.5px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>Sponsor</div>
        <div className="text-xs" style={{ color: 'var(--text-2)' }}>
          Want to reach SA&apos;s sport community?
        </div>
        <button className="btn-ghost w-full mt-3 text-xs">Become a partner</button>
      </div>
    </>
  )
}
