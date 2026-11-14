import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, FileText, ArrowLeft, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso — Vanta Site & Vantinha',
  description: 'Termos e condições de uso oficiais do site e assistente Vantinha.',
};

export default function TermosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-vanta text-gray-200 selection:bg-gold selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Breadcrumb / Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao início</span>
          </Link>

          {/* Header */}
          <div className="space-y-3 border-b border-white/[0.08] pb-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/10 border border-gold/20 text-gold text-xs font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>Documento Legal Oficial</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Termos de Uso
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              Última atualização: 14 de Novembro de 2026 • Versão 1.0 (Produção)
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-left text-sm text-gray-300 leading-relaxed font-sans">
            {/* 1. Aceitação */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">01.</span>
                <span>Aceitação dos Termos</span>
              </h2>
              <p>
                Ao acessar ou utilizar o website oficial (<strong className="text-white">vantasite-puce.vercel.app</strong>), o painel administrativo ou o aplicativo do Discord <strong className="text-white">Vantinha</strong> (ID: <code className="text-gold font-mono text-xs">1567751920645308548</code>), você declara expressamente que leu, compreendeu e concorda em cumprir estes Termos de Uso e todas as leis e regulamentos aplicáveis.
              </p>
              <p className="text-xs text-gray-400">
                Caso você não concorde com qualquer disposição deste documento, solicitamos que interrompa imediatamente o uso do site e remova o bot de quaisquer servidores sob sua administração.
              </p>
            </section>

            {/* 2. Descrição dos Serviços */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">02.</span>
                <span>Descrição dos Serviços e Escopo</span>
              </h2>
              <p>
                O ecossistema Vanta disponibiliza ferramentas de segurança, verificação e automação voltadas a comunidades do Discord. As funcionalidades abrangem:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300 pl-2">
                <li>Portal seguro de verificação de membros com controle de integridade;</li>
                <li>Detecção automática de contas secundárias (alts) no mesmo IP para prevenção de invasões (raids);</li>
                <li>Auditoria ativa de conexões e identificação de redes proxy ou VPN suspeitas;</li>
                <li>Interface interativa baseada em Discord Components (/counter, /help, /ping);</li>
                <li>Telemetria de status e monitoramento de disponibilidade em tempo real via banco de dados seguro.</li>
              </ul>
            </section>

            {/* 3. Condutas Estritamente Proibidas */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#fbbd23]" />
                <span className="text-gold font-mono text-xs">03.</span>
                <span>Condutas Proibidas e Violações de Segurança</span>
              </h2>
              <p>É estritamente vedado a qualquer usuário, sob pena de banimento imediato e ações cabíveis:</p>
              <div className="grid grid-cols-1 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block">Evasão de Punições & Contas Alts:</strong>
                  <span className="text-gray-400">Criar ou utilizar contas alternativas com o objetivo de burlar advertências, suspensões ou banimentos aplicados na comunidade.</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block">Ataques à Infraestrutura:</strong>
                  <span className="text-gray-400">Executar ataques de negação de serviço (DoS/DDoS), spam de requisições, injeção de código malicioso ou sobrecarga dos endpoints de telemetria.</span>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <strong className="text-white block">Engenharia Reversa & Plágio de Código:</strong>
                  <span className="text-gray-400">Descompilar, clonar, criar forks não autorizados ou comercializar partes do código-fonte, layout, marca, logotipo ou design tokens do ecossistema Vanta.</span>
                </div>
              </div>
            </section>

            {/* 4. Autenticação Discord */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">04.</span>
                <span>Autenticação via Discord OAuth2</span>
              </h2>
              <p>
                O acesso a áreas restritas e ao painel web é autenticado diretamente pela infraestrutura oficial do <strong className="text-white">Discord OAuth2</strong>. O Vanta nunca tem acesso à sua senha ou métodos de pagamento.
              </p>
              <p className="text-xs text-gray-400">
                Os escopos solicitados (<code className="text-gold font-mono">identify</code>, <code className="text-gold font-mono">guilds</code>, <code className="text-gold font-mono">guilds.join</code>) são estritamente necessários para validar sua identidade e atribuir os cargos devidos nos servidores autorizados.
              </p>
            </section>

            {/* 5. Propriedade Intelectual */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold" />
                <span className="text-gold font-mono text-xs">05.</span>
                <span>Propriedade Intelectual & Direitos Autorais</span>
              </h2>
              <p>
                Todo o conteúdo deste website — incluindo, mas não se limitando a marcas, logotipos, ícones, código-fonte, layout e documentações associadas — é de propriedade exclusiva do <strong className="text-white">Vantinha</strong> e de seu desenvolvedor titular.
              </p>
              <p className="text-xs text-gray-400">
                O código é protegido pela licença proprietária (All Rights Reserved). Qualquer tentativa de cópia comercial, rebranding ou white-labeling será tratada via notificação de DMCA Takedown e responsabilização civil e criminal.
              </p>
            </section>

            {/* 6. Limitação de Responsabilidade */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">06.</span>
                <span>Limitação de Responsabilidade</span>
              </h2>
              <p>
                Embora envidemos os melhores esforços de engenharia para manter a disponibilidade contínua (24/7) e a integridade do sistema, o serviço é fornecido <em className="text-white">"no estado em que se encontra" (as is)</em>, sem garantias implícitas de infalibilidade ou compatibilidade com alterações futuras nas APIs do Discord.
              </p>
            </section>

            {/* 7. Contato */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">07.</span>
                <span>Suporte e Contato Oficial</span>
              </h2>
              <p>
                Para dúvidas, esclarecimentos sobre estes termos ou solicitações de segurança, contate nossa equipe através do servidor oficial da comunidade:
              </p>
              <div className="pt-2">
                <a
                  href="https://discord.gg/vanta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-hover text-black font-semibold text-xs transition-all shadow-md shadow-gold/20"
                >
                  <span>Servidor de Suporte Discord</span>
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
