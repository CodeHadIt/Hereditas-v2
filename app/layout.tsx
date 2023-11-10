import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'
import ThemeProviders from '@/components/providers/ThemeProvider'
import WalletProviders from '@/components/providers/WalletProviders'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import BlobBg from '@/components/BlobBg'
import { Toaster } from '@/components/ui/toaster'

const monolisa = localFont({src: "../fonts/Monolisa.ttf"})

export const metadata: Metadata = {
  title: {
    default: "Hereditas",
    template: "%s | Hereditas",
  },
  description: 'The best way to gift digital assets onchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={monolisa.className}>
        <ThemeProviders>
          <WalletProviders>
            <Header />
            <main className="min-h-screen overflow-hidden relative">
              <BlobBg />
              {children}
            </main>
            <Footer />
            <Toaster />
          </WalletProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}
