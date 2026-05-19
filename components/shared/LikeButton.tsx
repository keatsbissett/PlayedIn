'use client'

import { useState, useOptimistic, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'

interface LikeButtonProps {
  threadId: string
  initialCount: number
  userId?: string
  initialLiked?: boolean
}

export function LikeButton({ threadId, initialCount, userId, initialLiked = false }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [isPending, startTransition] = useTransition()
  const supabase = createClient()

  function handleClick() {
    if (!userId) return

    const newLiked = !liked
    setLiked(newLiked)
    setCount(c => newLiked ? c + 1 : c - 1)

    startTransition(async () => {
      if (newLiked) {
        const { error } = await supabase.from('thread_likes').insert({ user_id: userId, thread_id: threadId })
        if (error) {
          setLiked(!newLiked)
          setCount(c => newLiked ? c - 1 : c + 1)
        }
      } else {
        const { error } = await supabase.from('thread_likes').delete().eq('user_id', userId).eq('thread_id', threadId)
        if (error) {
          setLiked(!newLiked)
          setCount(c => newLiked ? c - 1 : c + 1)
        }
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-xs font-medium"
      style={{ color: liked ? 'var(--rose)' : 'var(--text-3)' }}
    >
      {liked ? '♥' : '♡'} {count}
    </button>
  )
}
