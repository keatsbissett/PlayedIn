export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-[400px] px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span style={{ color: 'var(--green)' }}>played</span>
            <span style={{ color: 'var(--text)' }}>in</span>
            <span style={{ color: 'var(--green)' }}>.</span>
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-3)' }}>
            South Africa&apos;s sport community
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
