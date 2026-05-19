import { createClient } from '@/lib/supabase/server'
import { GreetingBar } from '@/components/feed/GreetingBar'
import { StatsStrip } from '@/components/feed/StatsStrip'
import { SportTabs } from '@/components/feed/SportTabs'
import { ShortcutCards } from '@/components/feed/ShortcutCards'
import { MarketplacePreviewStrip } from '@/components/feed/MarketplacePreviewStrip'
import { PostComposer } from '@/components/feed/PostComposer'
import { FeedFilterBar } from '@/components/feed/FeedFilterBar'
import { ThreadRow } from '@/components/feed/ThreadRow'
import { Suspense } from 'react'

interface HomePageProps {
  searchParams: Promise<{ sport?: string; filter?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const activeSport = params.sport || null
  const filter = params.filter || 'latest'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data
  }

  let threadsQuery = supabase
    .from('threads')
    .select('*, author:profiles!threads_author_id_fkey(*)')

  if (activeSport) {
    threadsQuery = threadsQuery.eq('sport', activeSport)
  }

  if (filter === 'trending') {
    threadsQuery = threadsQuery.order('like_count', { ascending: false })
  } else {
    threadsQuery = threadsQuery.order('is_pinned', { ascending: false }).order('created_at', { ascending: false })
  }

  const { data: threads } = await threadsQuery.limit(20)

  return (
    <div>
      {profile && (
        <GreetingBar
          displayName={profile.display_name}
          activeSport={activeSport}
        />
      )}

      <StatsStrip />

      <Suspense>
        <SportTabs />
      </Suspense>

      <ShortcutCards
        activeSport={activeSport}
        lastVisitedAt={profile?.last_visited_at || null}
        userProvince={profile?.location || null}
      />

      <MarketplacePreviewStrip />

      {user && profile && (
        <PostComposer
          userId={user.id}
          displayName={profile.display_name}
          avatarUrl={profile.avatar_url}
          activeSport={activeSport}
        />
      )}

      <Suspense>
        <FeedFilterBar />
      </Suspense>

      {/* Thread list */}
      <div className="flex flex-col">
        {(threads || []).map(thread => (
          <ThreadRow
            key={thread.id}
            thread={thread as any}
            isUnread={profile?.last_visited_at ? new Date(thread.created_at) > new Date(profile.last_visited_at) : false}
          />
        ))}
        {(!threads || threads.length === 0) && (
          <div className="text-center py-12">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-2)' }}>No threads yet</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Be the first to start a discussion</p>
          </div>
        )}
      </div>
    </div>
  )
}
