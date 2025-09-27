import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Worker Dashboard - AgroSena',
  description: 'Find and apply for agricultural jobs in your area.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function WorkerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
