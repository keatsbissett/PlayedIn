'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

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
      <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>Sign in</h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-3)' }}>Welcome back to the community</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-xs font-medium" style={{ color: 'var(--rose)' }}>{error}</p>
        )}

        <button type="submit" className="btn-primary w-full mt-1" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-xs mt-5" style={{ color: 'var(--text-3)' }}>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold" style={{ color: 'var(--green)' }}>Sign up</Link>
      </p>
    </div>
  )
}
