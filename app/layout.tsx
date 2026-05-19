import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "PlayedIn — South Africa's Sport Community",
  description: 'Forum, marketplace, and community for SA sports players — Padel, Golf, Cycling, Running.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}
