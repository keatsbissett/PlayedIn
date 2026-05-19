import { prefixClass } from '@/lib/constants'

export function PrefixTag({ prefix }: { prefix: string }) {
  return <span className={`prefix-tag ${prefixClass(prefix)}`}>{prefix}</span>
}
