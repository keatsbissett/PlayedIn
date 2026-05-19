export function TrustBadge({ tier }: { tier: string }) {
  if (tier === 'trusted') {
    return (
      <span className="badge-trust badge-trusted">
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
          <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Zm-1 13-3.5-3.5L9 10l2 2 4-4 1.5 1.5L11 15Z" />
        </svg>
        Trusted
      </span>
    )
  }
  if (tier === 'club_partner') {
    return (
      <span className="badge-trust badge-club">
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11 }}>
          <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Zm-1 13-3.5-3.5L9 10l2 2 4-4 1.5 1.5L11 15Z" />
        </svg>
        Club Partner
      </span>
    )
  }
  return <span className="badge-trust badge-new">New Seller</span>
}
