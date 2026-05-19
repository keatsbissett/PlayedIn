'use server'

import { createClient } from '@/lib/supabase/server'

export async function updateLastVisited() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from('profiles')
    .update({ last_visited_at: new Date().toISOString() })
    .eq('id', user.id)
}
