import { createClient } from '@/lib/supabase/server'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { ChatBar } from '@/components/layout/ChatBar'
import { MobileNav } from '@/components/layout/MobileNav'
import { MobileTabbar } from '@/components/layout/MobileTabbar'
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
    <div className="h-screen flex flex-col">
      {/* Mobile header */}
      <MobileNav />

      <div className="flex flex-1 min-h-0">
        {/* Left sidebar — desktop only */}
        <LeftSidebar profile={profile} newSinceLastVisit={newSinceLastVisit} />

        {/* Center content */}
        <main className="flex-1 overflow-y-auto px-4 py-4 lg:px-5 lg:py-4" style={{ maxWidth: 1080 }}>
          {children}
        </main>

        {/* Right sidebar — xl only */}
        <RightSidebar />
      </div>

      {/* Mobile bottom tabbar */}
      <MobileTabbar />

      {/* Chat bar — always visible */}
      <ChatBar />
    </div>
  )
}
