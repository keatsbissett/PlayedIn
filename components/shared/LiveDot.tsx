export function LiveDot({ size = 8 }: { size?: number }) {
  return <span className="live-dot" style={{ width: size, height: size }} />
}
