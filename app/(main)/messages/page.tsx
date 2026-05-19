export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Messages</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-3)' }}>Your conversations</p>
      <div className="text-center py-16">
        <p className="text-sm" style={{ color: 'var(--text-3)' }}>No messages yet</p>
      </div>
    </div>
  )
}
