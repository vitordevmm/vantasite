import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import { CookieConsent } from '@/components/CookieConsent';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vantasite-puce.vercel.app'),
  title: 'Vantinha — Assistente Oficial de Segurança & Telemetria',
  description: 'Assistente oficial de segurança e telemetria do Vantinha. Verificação de identidade com detecção de contas secundárias (alts), auditoria contra proxy e comandos interativos.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Vantinha — Assistente Oficial de Segurança & Telemetria',
    description: 'Assistente oficial de segurança e telemetria do Vantinha. Verificação de identidade, detecção de alts e telemetria em tempo real.',
    url: 'https://vantasite-puce.vercel.app',
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#08080a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`dark ${spaceGrotesk.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-vanta text-gray-200 font-sans antialiased selection:bg-gold selection:text-black relative">
        {/* Subtle structural ambient lighting in gold */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gold/[0.03] blur-[140px] rounded-full" />
        </div>

        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
