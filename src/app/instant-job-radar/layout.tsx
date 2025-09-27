import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Instant Job Radar - AgroSena',
  description: 'Real-time worker notification and response tracking for instant agricultural jobs.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InstantJobRadarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
