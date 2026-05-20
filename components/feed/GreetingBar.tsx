import { createClient } from '@/lib/supabase/server'
import { greetingTime } from '@/lib/constants'
import { LiveDot } from '@/components/shared/LiveDot'

interface GreetingBarProps {
  displayName: string
  activeSport: string | null
}

export async function GreetingBar({ displayName, activeSport }: GreetingBarProps) {
  const supabase = await createClient()

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  let subtitle = ''

  if (activeSport) {
    const { count } = await supabase
      .from('threads')
      .select('*', { count: 'exact', head: true })
      .eq('sport', activeSport)
      .gte('created_at', oneHourAgo)
    subtitle = `${count || 0} ${activeSport} threads in the last hour — what did you miss?`
  } else {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const { count } = await supabase
      .from('threads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString())
    subtitle = `${count || 0} posts across all sports today`
  }

  return (
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <LiveDot size={8} />
          <span className="text-[13px] font-bold font-mono" style={{ color: 'var(--green)' }}>
            LIVE — 0 members active across SA
          </span>
        </div>
        <h1 className="text-[20px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>
          Good {greetingTime()}, {displayName.split(' ')[0]}
        </h1>
        <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-2)' }}>{subtitle}</p>
      </div>
      <button className="btn-primary flex-shrink-0">Invite a mate</button>
    </div>
  )
}
