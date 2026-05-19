import { createClient } from '@/lib/supabase/server'

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let notifications: any[] = []
  if (user) {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
    notifications = data || []
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Notifications</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Stay updated on your activity</p>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>No notifications yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {notifications.map(n => (
            <div key={n.id} className="card px-4 py-3 flex items-start gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0" style={{ background: n.is_read ? 'transparent' : 'var(--green)' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{n.title}</div>
                {n.body && <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{n.body}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
