import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, Database, ArrowLeft, CheckCircle2, UserCheck, Server } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Vanta Site & Vantinha',
  description: 'Política de privacidade e proteção de dados do portal oficial e bot Vantinha.',
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-vanta text-gray-200 selection:bg-gold selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Breadcrumb */}
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
              <Shield className="w-3.5 h-3.5" />
              <span>Privacidade & Proteção de Dados (LGPD)</span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Política de Privacidade
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono">
              Última atualização: 14 de Novembro de 2026 • Versão 1.0 (Produção)
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-left text-sm text-gray-300 leading-relaxed font-sans">
            {/* 1. Compromisso */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">01.</span>
                <span>Compromisso com a Privacidade e Transparência</span>
              </h2>
              <p>
                Os desenvolvedores do assistente <strong className="text-white">Vantinha</strong> estão comprometidos em proteger a privacidade, a integridade e os dados de todos os membros e visitantes do nosso ecossistema.
              </p>
              <p className="text-xs text-gray-400">
                Esta política esclarece quais dados coletamos, a base legal para seu processamento, onde são armazenados e como você pode exercer seus direitos fundamentais de privacidade.
              </p>
            </section>

            {/* 2. Dados Coletados */}
            <section className="space-y-4 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-gold" />
                <span className="text-gold font-mono text-xs">02.</span>
                <span>Dados Coletados e Origem</span>
              </h2>
              <p>
                Coletamos apenas as informações estritamente necessárias para a operação segura do ecossistema:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-gold" />
                    <span>Identidade Discord (OAuth2)</span>
                  </div>
                  <p className="text-gray-400">
                    ID único do Discord, nome de usuário, tag, URL pública do avatar e servidores compartilhados. Obtidos com seu consentimento explícito durante o login.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Server className="w-3.5 h-3.5 text-gold" />
                    <span>Dados de Rede e Verificação</span>
                  </div>
                  <p className="text-gray-400">
                    Endereço IP e User-Agent capturados no momento em que você realiza a verificação de membro para análise de proxies, VPNs e detecção de contas alts.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Finalidade do Tratamento */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">03.</span>
                <span>Finalidade do Uso dos Dados</span>
              </h2>
              <p>Os dados tratados possuem objetivos exclusivos de segurança e governança comunitária:</p>
              <ul className="list-disc list-inside space-y-2 text-xs text-gray-300 pl-2">
                <li>
                  <strong className="text-white">Prevenção a Invasões e Raids:</strong> Cruzamento de IPs conhecidos para identificar contas secundárias (alts) que tentam evadir punições anteriores no servidor.
                </li>
                <li>
                  <strong className="text-white">Auditoria Anti-Proxy/VPN:</strong> Verificação de integridade da conexão para impedir bots automatizados de acessarem canais restritos.
                </li>
                <li>
                  <strong className="text-white">Autenticação e Sessão:</strong> Manutenção do estado de login no painel administrativo via cookies seguros (HttpOnly).
                </li>
                <li>
                  <strong className="text-white">Atribuição de Permissões:</strong> Entrega automatizada de cargos no servidor Discord após conclusão da verificação.
                </li>
              </ul>
            </section>

            {/* 4. Política de Cookies */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold" />
                <span className="text-gold font-mono text-xs">04.</span>
                <span>Política de Cookies & Armazenamento Local</span>
              </h2>
              <p>
                Nosso site adota uma postura minimalista e ética em relação a rastreadores:
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Cookies Estritamente Necessários:</strong> Armazenam a sessão criptografada do usuário autenticado para manter o acesso ao painel web.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Armazenamento Local (LocalStorage):</strong> Guarda unicamente sua preferência no banner de cookies (<code className="text-gold font-mono">vanta_cookie_consent</code>).
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white">Zero Rastreadores de Terceiros:</strong> Não utilizamos Google Analytics, pixels publicitários ou scripts de telemetria invasiva de marketing.
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Armazenamento e Não Comercialização */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold" />
                <span className="text-gold font-mono text-xs">05.</span>
                <span>Segurança e Não Compartilhamento</span>
              </h2>
              <p>
                Os registros são mantidos de maneira confidencial em bancos de dados do <strong className="text-white">Google Cloud Firestore</strong> sob estrita política de controle de acesso.
              </p>
              <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/20 text-xs text-gold">
                <strong>Cláusula de Não-Comercialização:</strong> O Vantinha jamais vende, aluga, troca ou compartilha dados de usuários com anunciantes, corretores de dados (data brokers) ou quaisquer parceiros comerciais externos.
              </div>
            </section>

            {/* 6. Direitos do Titular (LGPD) */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">06.</span>
                <span>Seus Direitos sob a LGPD</span>
              </h2>
              <p>Como titular dos dados, você pode exercer a qualquer momento:</p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300 pl-2">
                <li>Confirmação da existência de dados cadastrais vinculados ao seu ID Discord;</li>
                <li>Acesso facilitado às informações de dossiê de segurança;</li>
                <li>Correção de dados incompletos ou inexatos;</li>
                <li>Exclusão definitiva de seu registro da nossa base de dados (sujeita à desvinculação do servidor Vanta Hub).</li>
              </ul>
            </section>

            {/* 7. Contato */}
            <section className="space-y-3 p-6 rounded-2xl bg-vanta-dark border border-white/[0.08]">
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-gold font-mono text-xs">07.</span>
                <span>Canal de Privacidade e Encarregado</span>
              </h2>
              <p>
                Para exercer qualquer um dos seus direitos de privacidade ou reportar preocupações com segurança de dados, utilize nosso canal direto:
              </p>
              <div className="pt-2">
                <a
                  href="https://discord.gg/vanta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-hover text-black font-semibold text-xs transition-all shadow-md shadow-gold/20"
                >
                  <span>Abrir Ticket no Servidor Vanta</span>
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
