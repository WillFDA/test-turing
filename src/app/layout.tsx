import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { DataProvider } from '@/components/data-provider'

export const metadata: Metadata = {
  title: 'AG1 Dashboard - Meta Ads Analytics',
  description: 'Dashboard analytique pour visualiser les performances publicitaires Meta Ads',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-60 flex-1">
            <DataProvider>{children}</DataProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
