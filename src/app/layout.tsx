import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgroSena - Smart Agriculture Solutions',
  description: 'Revolutionizing agriculture with smart technology and sustainable farming practices. Join the future of farming with AgroSena.',
  keywords: 'agriculture, farming, smart farming, sustainable agriculture, crop management, agricultural technology',
  authors: [{ name: 'AgroSena Team' }],
  openGraph: {
    title: 'AgroSena - Smart Agriculture Solutions',
    description: 'Revolutionizing agriculture with smart technology and sustainable farming practices.',
    url: 'https://agrosena.com',
    siteName: 'AgroSena',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AgroSena - Smart Agriculture Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroSena - Smart Agriculture Solutions',
    description: 'Revolutionizing agriculture with smart technology and sustainable farming practices.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
