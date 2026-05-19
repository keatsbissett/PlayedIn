import { Avatar } from '@/components/shared/Avatar'
import { SportPill } from '@/components/shared/SportPill'
import { PrefixTag } from '@/components/shared/PrefixTag'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { timeAgo } from '@/lib/constants'
import type { Thread, Reply, Profile } from '@/lib/types/database.types'
import { LikeButton } from '@/components/shared/LikeButton'

interface ThreadDetailProps {
  thread: Thread & { author: Profile }
  replies: (Reply & { author: Profile })[]
  userId?: string
}

export function ThreadDetail({ thread, replies, userId }: ThreadDetailProps) {
  return (
    <div>
      {/* Thread header */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <PrefixTag prefix={thread.prefix} />
          <SportPill sport={thread.sport} />
        </div>
        <h1 className="text-xl font-bold mb-3" style={{ color: 'var(--text)' }}>{thread.title}</h1>
        <div className="flex items-center gap-2.5 mb-4">
          <Avatar name={thread.author.display_name} url={thread.author.avatar_url} size={32} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{thread.author.display_name}</span>
              <TrustBadge tier={thread.author.trust_tier} />
            </div>
            <div className="text-xs" style={{ color: 'var(--text-3)' }}>
              {thread.author.location} · {timeAgo(thread.created_at)}
            </div>
          </div>
        </div>
        <div className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>
          {thread.body}
        </div>
        <div className="flex items-center gap-4 py-3" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <LikeButton threadId={thread.id} initialCount={thread.like_count} userId={userId} />
          <span className="text-xs" style={{ color: 'var(--text-3)' }}>💬 {thread.reply_count} replies</span>
        </div>
      </div>

      {/* Replies */}
      <div className="flex flex-col gap-0">
        {replies.map(reply => (
          <div key={reply.id} className="py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Avatar name={reply.author.display_name} url={reply.author.avatar_url} size={26} />
              <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{reply.author.display_name}</span>
              <TrustBadge tier={reply.author.trust_tier} />
              <span className="text-[11px] ml-auto" style={{ color: 'var(--text-3)' }}>{timeAgo(reply.created_at)}</span>
            </div>
            <div className="text-sm pl-[34px]" style={{ color: 'var(--text-2)', whiteSpace: 'pre-wrap' }}>
              {reply.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
