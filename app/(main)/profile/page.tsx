import { createClient } from '@/lib/supabase/server'
import { Avatar } from '@/components/shared/Avatar'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) redirect('/login')

  const { count: threadCount } = await supabase.from('threads').select('*', { count: 'exact', head: true }).eq('author_id', user.id)
  const { count: listingCount } = await supabase.from('listings').select('*', { count: 'exact', head: true }).eq('seller_id', user.id)

  return (
    <div>
      <div className="card p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar name={profile.display_name} url={profile.avatar_url} size={64} />
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{profile.display_name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>@{profile.username}</span>
              <TrustBadge tier={profile.trust_tier} />
            </div>
            {profile.location && (
              <div className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>📍 {profile.location}</div>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>{profile.bio}</p>
        )}

        <div className="flex gap-6">
          <div>
            <span className="text-lg font-bold font-mono" style={{ color: 'var(--text)' }}>{threadCount || 0}</span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-3)' }}>posts</span>
          </div>
          <div>
            <span className="text-lg font-bold font-mono" style={{ color: 'var(--orange)' }}>{listingCount || 0}</span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-3)' }}>listings</span>
          </div>
          <div>
            <span className="text-lg font-bold font-mono" style={{ color: 'var(--green)' }}>{profile.trade_count}</span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-3)' }}>trades</span>
          </div>
        </div>
      </div>
    </div>
  )
}
