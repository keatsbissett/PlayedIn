import { MARKETPLACE_CATEGORIES, type Sport } from '@/lib/marketplace/categories'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{ sport: string }>
}

export default async function CategoryDirectoryPage({ params }: CategoryPageProps) {
  const { sport } = await params

  if (!(sport in MARKETPLACE_CATEGORIES)) notFound()

  const sportData = MARKETPLACE_CATEGORIES[sport as Sport]

  return (
    <div>
      <Link href="/marketplace" className="flex items-center gap-1.5 text-xs font-medium mb-4 no-underline" style={{ color: 'var(--text-3)' }}>
        <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        All sports
      </Link>

      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-3 h-3 rounded-full" style={{ background: sportData.color }} />
        <h1 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{sportData.label}</h1>
      </div>

      <div className="flex flex-col gap-1.5">
        {sportData.categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/marketplace/${sport}/${cat.slug}`}
            className="card px-4 py-3.5 no-underline flex items-center justify-between transition-all hover:border-border-2"
          >
            <div>
              <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{cat.label}</div>
              <div className="text-xs" style={{ color: 'var(--text-3)' }}>{cat.desc}</div>
              {cat.tags.length > 0 && (
                <div className="flex gap-1.5 mt-1.5">
                  {cat.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,.06)', color: 'var(--text-3)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <svg style={{ width: 16, height: 16, color: 'var(--text-3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
