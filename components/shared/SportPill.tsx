import { SPORT_MAP } from '@/lib/constants'

export function SportPill({ sport }: { sport: string }) {
  const s = SPORT_MAP[sport]
  if (!s) return null
  return <span className={`pill ${s.pillClass}`}>{s.name}</span>
}
