import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post New Job - AgroSena',
  description: 'Create and post new agricultural job opportunities.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PostJobLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
