'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VANTA_CONSTANTS } from '@/lib/constants';
import { DiscordUser, getDiscordAvatarUrl } from '@/lib/discord';
import { Menu, X, ArrowUpRight, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentUser?: DiscordUser | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-vanta/90 backdrop-blur-md border-b border-white/[0.08] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand - Sem card em volta da logo e sem versão */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Vanta Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-gold transition-colors">
              Vantinha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#recursos"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Funcionalidades
            </Link>
            <Link
              href="/#comandos"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Comandos
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-300 hover:text-gold transition-colors"
            >
              Painel Web
            </Link>
            <a
              href={VANTA_CONSTANTS.bot.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              Suporte <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-vanta-dark hover:bg-vanta-card border border-white/10 hover:border-gold/40 transition-all text-xs font-medium text-gray-200"
                >
                  <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gold">
                    <Image
                      src={getDiscordAvatarUrl(currentUser, 48)}
                      alt={currentUser.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span>{currentUser.global_name || currentUser.username}</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="p-2 rounded-lg bg-vanta-dark hover:bg-vanta-card border border-white/10 text-gray-300 hover:text-gold transition-all"
                  title="Dashboard"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <a
                href={VANTA_CONSTANTS.bot.authUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-discord hover:bg-discord-hover transition-all duration-200 shadow-md shadow-discord/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span>Login com Discord</span>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-vanta-dark border border-white/10 text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-vanta-dark border-b border-white/10 px-6 py-6 mt-3">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link href="/#recursos" onClick={() => setMobileMenuOpen(false)}>
              Funcionalidades
            </Link>
            <Link href="/#comandos" onClick={() => setMobileMenuOpen(false)}>
              Comandos
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gold">
              Painel Web
            </Link>
            <a
              href={VANTA_CONSTANTS.bot.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between"
            >
              <span>Servidor de Suporte</span>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </a>
            <div className="pt-3 border-t border-white/10">
              <a
                href={VANTA_CONSTANTS.bot.authUrl}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-discord text-white font-semibold text-xs"
              >
                <span>Login com Discord</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
