import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - AgroSena | Agricultural Job Matching Platform',
  description: 'Sign in to AgroSena to find agricultural jobs or hire skilled workers. Join our community of farmers and agricultural professionals.',
  keywords: 'login, sign in, agricultural jobs, farm workers, land owners, AgroSena',
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
