'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VANTA_CONSTANTS } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-vanta relative z-10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand - Sem card em volta da logo */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image src="/logo.png" alt="Vanta" fill className="object-contain" />
              </div>
              <span className="font-display font-bold text-lg text-white">Vantinha</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              O assistente oficial de segurança e telemetria do Vantinha. Verificação de identidade, detecção de alts e comandos nativos.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-gray-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span>Gateway 14ms • Operacional</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mb-3">Navegação</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/#recursos" className="hover:text-gold transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/#comandos" className="hover:text-gold transition-colors">
                  Comandos
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gold transition-colors">
                  Painel de Controle
                </Link>
              </li>
            </ul>
          </div>

          {/* Discord */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mb-3">Discord</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a
                  href={VANTA_CONSTANTS.bot.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-1"
                >
                  Servidor de Suporte <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={VANTA_CONSTANTS.bot.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors flex items-center gap-1"
                >
                  Adicionar Bot <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <span className="text-gray-500 font-mono text-[11px]">ID: {VANTA_CONSTANTS.bot.id}</span>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-400 mb-3">Legal & Privacidade</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/termos" className="hover:text-gold transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-gold transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('vanta:open-cookie-preferences'));
                    }
                  }}
                  className="hover:text-gold transition-colors text-left"
                >
                  Preferências de Cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Vantinha. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/termos" className="hover:text-gold transition-colors">Termos</Link>
            <span>•</span>
            <Link href="/privacidade" className="hover:text-gold transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
