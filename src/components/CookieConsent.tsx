'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('vanta_cookie_consent');
      if (!consent) {
        // Exibe o banner após breve delay para transição suave
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // LocalStorage desativado ou indisponível
    }

    const handleReopen = () => setVisible(true);
    window.addEventListener('vanta:open-cookie-preferences', handleReopen);
    return () => window.removeEventListener('vanta:open-cookie-preferences', handleReopen);
  }, []);

  const handleAccept = (level: 'all' | 'essential') => {
    try {
      localStorage.setItem('vanta_cookie_consent', level);
      localStorage.setItem('vanta_cookie_consent_date', new Date().toISOString());
    } catch (e) {
      // fallback
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121217]/95 backdrop-blur-md border border-gold/30 shadow-2xl text-left font-sans space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-sm text-white">
              Privacidade & Cookies
            </h3>
          </div>
          <button
            onClick={() => handleAccept('essential')}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
            title="Fechar"
            aria-label="Fechar banner de cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          Utilizamos cookies essenciais para autenticação de sessão via Discord OAuth2 e garantia de segurança do ecossistema Vanta. Nenhum dado de navegação é vendido ou compartilhado com terceiros.
        </p>

        <div className="text-[11px] text-gray-500 font-mono">
          Consulte nossa{' '}
          <Link href="/privacidade" className="text-gold hover:underline">
            Política de Privacidade
          </Link>{' '}
          e os{' '}
          <Link href="/termos" className="text-gold hover:underline">
            Termos de Uso
          </Link>
          .
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleAccept('all')}
            className="flex-1 py-2 px-3 rounded-lg bg-gold hover:bg-gold-hover text-black text-xs font-semibold transition-all shadow-md shadow-gold/20 text-center"
          >
            Aceitar Todos
          </button>
          <button
            onClick={() => handleAccept('essential')}
            className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/10 transition-all text-center"
          >
            Apenas Essenciais
          </button>
        </div>
      </div>
    </div>
  );
}
