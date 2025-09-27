import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Job - AgroSena',
  description: 'Create and schedule new agricultural job opportunities.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CreateJobLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
