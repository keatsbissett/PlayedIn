import { createClient } from '@/lib/supabase/server'
import { ThreadRow } from '@/components/feed/ThreadRow'
import { SPORT_MAP } from '@/lib/constants'
import Link from 'next/link'

export default async function WhatsNewPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let threads: any[] = []

  if (user) {
    const { data: profile } = await supabase.from('profiles').select('last_visited_at').eq('id', user.id).single()

    if (profile?.last_visited_at) {
      const { data } = await supabase
        .from('threads')
        .select('*, author:profiles!threads_author_id_fkey(*)')
        .gt('created_at', profile.last_visited_at)
        .order('created_at', { ascending: false })
        .limit(50)
      threads = data || []
    }
  }

  const grouped = threads.reduce<Record<string, any[]>>((acc, t) => {
    const sport = t.sport
    if (!acc[sport]) acc[sport] = []
    acc[sport].push(t)
    return acc
  }, {})

  const isEmpty = threads.length === 0

  return (
    <div>
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>What&apos;s New</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Posts since your last visit</p>

      {isEmpty ? (
        <div className="text-center py-16">
          <p className="text-base font-medium mb-2" style={{ color: 'var(--text-2)' }}>You&apos;re all caught up 🎉</p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Nothing new since your last visit</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="btn-primary no-underline">Start a discussion</Link>
            <Link href="/marketplace" className="btn-ghost no-underline">Browse the marketplace</Link>
          </div>
        </div>
      ) : (
        Object.entries(grouped).map(([sport, sportThreads]) => {
          const sportInfo = SPORT_MAP[sport]
          return (
            <div key={sport} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: sportInfo?.hex || 'var(--text-3)' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{sportInfo?.name || sport}</span>
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>{sportThreads.length} new</span>
              </div>
              {sportThreads.map((thread: any) => (
                <ThreadRow key={thread.id} thread={thread} isUnread />
              ))}
            </div>
          )
        })
      )}
    </div>
  )
}
