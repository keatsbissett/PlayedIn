import Link from 'next/link'
import { Avatar } from '@/components/shared/Avatar'
import { SportPill } from '@/components/shared/SportPill'
import { PrefixTag } from '@/components/shared/PrefixTag'
import { TrustBadge } from '@/components/shared/TrustBadge'
import { timeAgo, SPORT_MAP } from '@/lib/constants'
import type { Thread, Profile } from '@/lib/types/database.types'

interface ThreadRowProps {
  thread: Thread & { author: Profile }
  isUnread?: boolean
}

export function ThreadRow({ thread, isUnread = false }: ThreadRowProps) {
  const sport = SPORT_MAP[thread.sport]
  const borderColor = isUnread ? (sport?.hex || 'var(--green)') : 'transparent'

  return (
    <Link
      href={`/thread/${thread.id}`}
      className="block no-underline rounded-lg transition-all hover:bg-bg-2"
      style={{
        borderLeft: `2px solid ${borderColor}`,
        padding: '10px 12px 10px 14px',
      }}
    >
      {/* Line 1: Tags */}
      <div className="flex items-center gap-1.5 mb-1">
        <PrefixTag prefix={thread.prefix} />
        <SportPill sport={thread.sport} />
      </div>

      {/* Line 2: Title */}
      <h3
        className="text-[15.5px] font-bold mb-0.5 leading-snug"
        style={{ color: isUnread ? 'var(--text)' : '#C8CEC2' }}
      >
        {thread.title}
      </h3>

      {/* Line 3: Preview */}
      <p className="clamp-2 text-[13px] mb-2" style={{ color: 'var(--text-2)' }}>
        {thread.body}
      </p>

      {/* Bottom bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={thread.author.display_name} url={thread.author.avatar_url} size={22} />
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            {thread.author.display_name}
          </span>
          {thread.author.location && (
            <>
              <span style={{ color: 'var(--text-3)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{thread.author.location}</span>
            </>
          )}
          <TrustBadge tier={thread.author.trust_tier} />
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-3)' }}>
            💬 {thread.reply_count}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-3)' }}>
            ♡ {thread.like_count}
          </span>
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>
            {timeAgo(thread.created_at)}
          </span>
          {isUnread && <span className="w-[7px] h-[7px] rounded-full" style={{ background: 'var(--green)' }} />}
        </div>
      </div>
    </Link>
  )
}
