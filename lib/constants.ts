export const SPORTS = [
  { id: 'padel' as const, name: 'Padel', color: 'var(--green)', hex: '#7CC47A', pillClass: 'pill-padel', tabClass: 'padel' },
  { id: 'golf' as const, name: 'Golf', color: 'var(--gold)', hex: '#D4A843', pillClass: 'pill-golf', tabClass: 'golf' },
  { id: 'cycling' as const, name: 'Cycling', color: 'var(--teal)', hex: '#4ABFAD', pillClass: 'pill-cycling', tabClass: 'cycling' },
  { id: 'running' as const, name: 'Running', color: 'var(--orange)', hex: '#E8571A', pillClass: 'pill-running', tabClass: 'running' },
] as const

export const SPORT_MAP = Object.fromEntries(SPORTS.map(s => [s.id, s])) as Record<string, typeof SPORTS[number]>

export const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
] as const

export const THREAD_PREFIXES = ['Discussion', 'Game', 'Event', 'Gear Talk', 'Throwback'] as const
export const LISTING_PREFIXES = ['For Sale', 'WTB', 'Trade', 'Free'] as const
export const LISTING_CONDITIONS = ['New', 'Like new', 'Excellent', 'Good', 'Used'] as const

export const CHAT_CHANNELS = [
  { id: 'padel-general', label: 'Padel general', sport: 'padel' },
  { id: 'golf-general', label: 'Golf general', sport: 'golf' },
  { id: 'cycling-general', label: 'Cycling general', sport: 'cycling' },
  { id: 'running-general', label: 'Running general', sport: 'running' },
  { id: 'kzn-regional', label: 'KZN regional', sport: null },
  { id: 'marketplace-chat', label: 'Marketplace chat', sport: null },
] as const

export const AVATAR_COLORS = ['#7CC47A', '#D4A843', '#4ABFAD', '#E8571A', '#6FA8DC', '#E85C7A', '#B189E8', '#F2A65A']

export function avatarColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

export function initials(name: string): string {
  return name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}

export function formatPrice(cents: number): string {
  return `R ${(cents / 100).toLocaleString('en-ZA')}`
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  const weeks = Math.floor(days / 7)
  return `${weeks}w`
}

export function sportPlaceholder(sport: string | null): string {
  switch (sport) {
    case 'padel': return "What's happening in SA padel this week?"
    case 'golf': return 'Course conditions, tips, gear — share it with SA golfers.'
    case 'cycling': return "Trail updates, rides, gear — what's on?"
    case 'running': return 'Race reports, shoe reviews, training talk — go.'
    default: return 'Share something with the SA sports community…'
  }
}

export function prefixClass(prefix: string): string {
  const map: Record<string, string> = {
    'Discussion': 'prefix-discussion',
    'Game': 'prefix-game',
    'Event': 'prefix-event',
    'Gear Talk': 'prefix-geartalk',
    'Throwback': 'prefix-throwback',
    'For Sale': 'prefix-forsale',
    'WTB': 'prefix-wtb',
    'Trade': 'prefix-trade',
    'Free': 'prefix-free',
  }
  return map[prefix] || ''
}

export function greetingTime(): string {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
