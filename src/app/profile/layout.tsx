import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile - AgroSena',
  description: 'Manage your profile information and settings.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
