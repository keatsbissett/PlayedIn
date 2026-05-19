'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, location },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>Create account</h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-3)' }}>Join SA&apos;s sport community</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Display name</label>
          <input
            type="text"
            className="input-base"
            placeholder="e.g. Lloyd Bissett"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Email</label>
          <input
            type="email"
            className="input-base"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Password</label>
          <input
            type="password"
            className="input-base"
            placeholder="At least 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Location</label>
          <input
            type="text"
            className="input-base"
            placeholder="e.g. Durban, KZN"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-xs font-medium" style={{ color: 'var(--rose)' }}>{error}</p>
        )}

        <button type="submit" className="btn-primary w-full mt-1" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-xs mt-5" style={{ color: 'var(--text-3)' }}>
        Already have an account?{' '}
        <Link href="/login" className="font-semibold" style={{ color: 'var(--green)' }}>Sign in</Link>
      </p>
    </div>
  )
}
