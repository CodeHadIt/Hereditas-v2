import ThemeProviders from '@/components/providers/ThemeProvider'
import WalletProviders from '@/components/providers/WalletProviders'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'

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
            {children}
            <Toaster />
          </WalletProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}
