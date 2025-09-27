import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Details - AgroSena',
  description: 'View detailed information about this agricultural job opportunity.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function JobDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
