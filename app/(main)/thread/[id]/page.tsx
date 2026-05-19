import { createClient } from '@/lib/supabase/server'
import { ThreadDetail } from '@/components/feed/ThreadDetail'
import { ReplyComposer } from '@/components/feed/ReplyComposer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ThreadPageProps {
  params: Promise<{ id: string }>
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: thread } = await supabase
    .from('threads')
    .select('*, author:profiles!threads_author_id_fkey(*)')
    .eq('id', id)
    .single()

  if (!thread) notFound()

  const { data: replies } = await supabase
    .from('replies')
    .select('*, author:profiles!replies_author_id_fkey(*)')
    .eq('thread_id', id)
    .order('created_at', { ascending: true })

  let profile = null
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    profile = data
  }

  return (
    <div>
      <Link href="/" className="flex items-center gap-1.5 text-xs font-medium mb-4 no-underline" style={{ color: 'var(--text-3)' }}>
        <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to feed
      </Link>

      <ThreadDetail
        thread={thread as any}
        replies={(replies || []) as any}
        userId={user?.id}
      />

      {user && profile && (
        <ReplyComposer
          threadId={id}
          userId={user.id}
          displayName={profile.display_name}
          avatarUrl={profile.avatar_url}
        />
      )}
    </div>
  )
}
