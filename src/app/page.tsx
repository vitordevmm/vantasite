'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BotPreviewCard } from '@/components/BotPreviewCard';
import { VANTA_CONSTANTS } from '@/lib/constants';
import { DiscordUser } from '@/lib/discord';
import { ArrowRight, Shield, Zap, Sliders, Lock, Cpu, CheckCircle2 } from 'lucide-react';

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState<DiscordUser | null>(null);

  // Auto redirect if Discord returns to localhost:3000/?code=...
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      router.push(`/callback?code=${encodeURIComponent(code)}`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      } catch (e) {
        // guest mode
      }
    }
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-vanta text-gray-200 selection:bg-gold selection:text-black">
      <Navbar currentUser={currentUser} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct, real bot data & human copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-vanta-dark border border-gold/30 text-xs font-mono text-gold">
                <span>Vanta Hub</span>
                <span className="text-gray-500">•</span>
                <span>+350 Servidores</span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1 text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  100% Online
                </span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                O assistente oficial de segurança e infraestrutura do Vanta.
              </h1>

              <p className="text-base text-gray-400 max-w-xl leading-relaxed">
                Verificação de identidade com detecção de contas secundárias (alts), auditoria contra proxy e conexões suspeitas, proteção ativa 24/7 e comandos interativos de nova geração.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={VANTA_CONSTANTS.bot.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-black bg-gold hover:bg-gold-hover transition-all duration-200 flex items-center gap-2 shadow-lg shadow-gold/20"
                >
                  <span>Adicionar ao Discord</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <a
                  href={VANTA_CONSTANTS.bot.authUrl}
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-vanta-dark hover:bg-vanta-card border border-white/10 hover:border-gold/30 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current text-[#5865F2]" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Acessar Painel com Discord</span>
                </a>
              </div>

              {/* Bot Community Stats Bar */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="font-mono font-bold text-lg text-gold">99.9%</div>
                  <div className="text-xs text-gray-500">Uptime operacional</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-white">+350</div>
                  <div className="text-xs text-gray-500">Servidores ativos</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-lg text-white">+12.000</div>
                  <div className="text-xs text-gray-500">Membros protegidos</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Discord Mockup */}
            <div className="lg:col-span-5">
              <BotPreviewCard />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Real Bot Features */}
      <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gold">
              Capacidades do Bot
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Segurança e telemetria nativas operando em alta frequência.
            </h2>
            <p className="text-sm text-gray-400">
              O Vantinha atua como a fonte única da verdade para verificação de membros, cruzamento de IPs e controle de acesso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VANTA_CONSTANTS.features.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-vanta-dark border border-white/[0.08] hover:border-gold/30 transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-gray-500">0{index + 1}</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Architecture Value Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-vanta-dark/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gold">
              Arquitetura de Segurança
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Engenharia construída para proteger o ecossistema Vanta.
            </h2>
            <p className="text-sm text-gray-400">
              Três pilares fundamentais implementados no código e no servidor do bot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Detecção Global de Alts</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Identifica e vincula contas secundárias no mesmo IP de forma automática, impedindo invasões, evasão de punições e criação de perfis fakes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Auditoria Ativa e Anti-Proxy</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Monitoramento contínuo contra acessos suspeitos, bloqueio rigoroso de redes VPN/Proxy e portal de verificação segura com token exclusivo.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Sincronização 24/7</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Atribuição automática de cargos, persistência imediata de configurações e integridade com alta disponibilidade contínua no ecossistema Vanta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Section - Exact Bot Commands */}
      <section id="comandos" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gold">
              Comandos Nativos
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Comandos disponíveis no servidor
            </h2>
            <p className="text-sm text-gray-400">
              Interface interativa com botões e seletores nativos do Discord.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-gold">/help</code>
                <span className="text-[10px] font-mono text-gray-500">Central de Ajuda</span>
              </div>
              <p className="text-xs text-gray-400">
                Menu de auxílio com lista de comandos, orientações do bot e suporte para administradores.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-gold">/ping</code>
                <span className="text-[10px] font-mono text-gray-500">Diagnóstico Real</span>
              </div>
              <p className="text-xs text-gray-400">
                Mede a latência da conexão com o Discord e o tempo de resposta do bot em tempo real.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-vanta-dark border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-gold">/counter</code>
                <span className="text-[10px] font-mono text-gray-500">Interatividade</span>
              </div>
              <p className="text-xs text-gray-400">
                Contador interativo em Discord Components que atualiza em tempo real sem recarregar a mensagem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-vanta-dark border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Vantinha no seu servidor
            </h3>
            <p className="text-xs text-gray-400 max-w-lg">
              Adicione o bot ao seu servidor Discord ou acesse o painel web para monitorar as verificações e telemetria.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={VANTA_CONSTANTS.bot.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-semibold text-black bg-gold hover:bg-gold-hover transition-all shadow-md shadow-gold/20"
            >
              Adicionar Bot
            </a>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-vanta border border-white/10 transition-all"
            >
              Abrir Painel
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vanta" />}>
      <LandingPageContent />
    </Suspense>
  );
}
