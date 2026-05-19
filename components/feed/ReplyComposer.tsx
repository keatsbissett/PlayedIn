'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/shared/Avatar'

interface ReplyComposerProps {
  threadId: string
  userId: string
  displayName: string
  avatarUrl?: string | null
}

export function ReplyComposer({ threadId, userId, displayName, avatarUrl }: ReplyComposerProps) {
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit() {
    if (!body.trim()) return
    setLoading(true)

    const { error } = await supabase.from('replies').insert({
      thread_id: threadId,
      author_id: userId,
      body: body.trim(),
    })

    if (!error) {
      setBody('')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="sticky bottom-0 px-4 py-3" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      <div className="flex items-start gap-2.5">
        <Avatar name={displayName} url={avatarUrl} size={28} />
        <textarea
          className="input-base flex-1 resize-none text-sm"
          rows={2}
          placeholder="Write a reply…"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button
          className="btn-primary text-xs"
          onClick={handleSubmit}
          disabled={loading || !body.trim()}
        >
          Reply
        </button>
      </div>
    </div>
  )
}
