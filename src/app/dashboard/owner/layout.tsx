import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Owner Dashboard - AgroSena',
  description: 'Manage your agricultural job postings and find workers.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
