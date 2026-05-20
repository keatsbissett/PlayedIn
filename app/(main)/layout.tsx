import { createClient } from '@/lib/supabase/server'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { ChatBar } from '@/components/layout/ChatBar'
import { MobileNav } from '@/components/layout/MobileNav'
import { MobileTabbar } from '@/components/layout/MobileTabbar'
import { TopBanner } from '@/components/layout/TopBanner'
import { updateLastVisited } from '@/lib/actions'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  let newSinceLastVisit = 0

  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data

    if (profile?.last_visited_at) {
      const { count } = await supabase
        .from('threads')
        .select('*', { count: 'exact', head: true })
        .gt('created_at', profile.last_visited_at)
      newSinceLastVisit = count || 0
    }

    updateLastVisited()
  }

  return (
    <div className="app-shell">
      {/* Top banner with logo — hidden on mobile */}
      <TopBanner />

      {/* Mobile header — hidden on desktop */}
      <div className="mobile-nav">
        <MobileNav />
      </div>

      {/* Centered 3-column grid */}
      <div className="shell-body">
        <div className="sidebar-l">
          <LeftSidebar profile={profile} newSinceLastVisit={newSinceLastVisit} />
        </div>

        <main className="main-center">
          {children}
        </main>

        <div className="sidebar-r">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile tabbar — hidden on desktop */}
      <div className="mobile-tabbar">
        <MobileTabbar />
      </div>

      <div className="chat-bar-wrap">
        <ChatBar />
      </div>
    </div>
  )
}
