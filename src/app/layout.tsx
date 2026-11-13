import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
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
  metadataBase: new URL('http://localhost:3000'),
  title: 'Vantinha — O Bot Oficial da Comunidade Vanta',
  description: 'O bot definitivo para servidores no Discord. Moderação ativa contra invasões, tickets privados, economia e painel de controle em tempo real.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Vantinha — O Bot Oficial da Comunidade Vanta',
    description: 'Mais de 12.000 membros protegidos e +350 servidores ativos. Moderação, tickets e painel web integrado.',
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
      </body>
    </html>
  );
}
