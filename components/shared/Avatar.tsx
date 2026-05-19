import { avatarColor, initials } from '@/lib/constants'

interface AvatarProps {
  name: string
  url?: string | null
  size?: number
}

export function Avatar({ name, url, size = 36 }: AvatarProps) {
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }

  const bg = avatarColor(name)
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: size * 0.36,
        color: '#1A2018',
        letterSpacing: '-.02em',
      }}
    >
      {initials(name)}
    </div>
  )
}
