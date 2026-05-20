'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Avatar } from '@/components/shared/Avatar'
import { sportPlaceholder, THREAD_PREFIXES, SPORTS } from '@/lib/constants'

interface PostComposerProps {
  userId: string
  displayName: string
  avatarUrl?: string | null
  activeSport: string | null
}

export function PostComposer({ userId, displayName, avatarUrl, activeSport }: PostComposerProps) {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [prefix, setPrefix] = useState('Discussion')
  const [sport, setSport] = useState(activeSport || 'padel')
  const [showMore, setShowMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit() {
    if (!title.trim() || !body.trim()) return
    setLoading(true)

    const { error } = await supabase.from('threads').insert({
      author_id: userId,
      sport,
      prefix,
      title: title.trim(),
      body: body.trim(),
    })

    if (!error) {
      setTitle('')
      setBody('')
      setExpanded(false)
      router.refresh()
    }
    setLoading(false)
  }

  if (!expanded) {
    return (
      <div
        className="card px-4 py-3 mb-3 flex items-center gap-3 cursor-text"
        onClick={() => setExpanded(true)}
      >
        <Avatar name={displayName} url={avatarUrl} size={32} />
        <span className="flex-1 text-[13.5px]" style={{ color: 'var(--text-3)' }}>
          {sportPlaceholder(activeSport)}
        </span>
      </div>
    )
  }

  return (
    <div className="card px-4 py-3.5 mb-3">
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={displayName} url={avatarUrl} size={32} />
        <div className="flex-1">
          <input
            className="input-base mb-2"
            placeholder="Thread title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="input-base resize-none"
            rows={3}
            placeholder={sportPlaceholder(activeSport)}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button className="btn-ghost text-xs flex items-center gap-1.5">
          📷 Photo
        </button>

        <select
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
          className="btn-ghost text-xs cursor-pointer"
          style={{ background: 'transparent' }}
        >
          {THREAD_PREFIXES.map(p => (
            <option key={p} value={p} style={{ background: 'var(--bg-2)' }}>{p}</option>
          ))}
        </select>

        <select
          value={sport}
          onChange={e => setSport(e.target.value)}
          className="btn-ghost text-xs cursor-pointer"
          style={{ background: 'transparent' }}
        >
          {SPORTS.map(s => (
            <option key={s.id} value={s.id} style={{ background: 'var(--bg-2)' }}>{s.name}</option>
          ))}
        </select>

        {!showMore && (
          <button className="btn-ghost text-xs" onClick={() => setShowMore(true)}>+ More</button>
        )}
        {showMore && (
          <>
            <button className="btn-ghost text-xs">Poll</button>
            <button className="btn-ghost text-xs">Tag club</button>
          </>
        )}

        <div className="flex-1" />

        <button className="btn-ghost text-xs" onClick={() => setExpanded(false)}>Cancel</button>
        <button className="btn-primary text-xs" onClick={handleSubmit} disabled={loading || !title.trim() || !body.trim()}>
          {loading ? 'Posting…' : 'Post'}
        </button>
      </div>
    </div>
  )
}
