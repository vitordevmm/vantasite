'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Loader2, Lock } from 'lucide-react';

interface SessionData {
  token: string;
  userId: string;
  guildId: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://127.0.0.1:8080';
const BOT_API_KEY = process.env.NEXT_PUBLIC_BOT_API_KEY || 'vanta_secret_token_dev';

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const guildId = searchParams.get('guild') || '1567751748762869874';

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<{ token: string; guildId: string } | null>(
    token ? { token, guildId } : null
  );
  const [error, setError] = useState<string | null>(token ? null : 'Nenhum token de verificação foi fornecido.');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    status?: string;
    message?: string;
    actionTaken?: string;
    reason?: string;
    altsFound?: string[];
  } | null>(null);

  const handleVerify = async () => {
    if (!token) return;
    setSubmitting(true);
    setError(null);

    try {
      // Chama diretamente a API do bot Fastify sem camadas extras no site
      const res = await fetch(`${BOT_API_URL}/api/verification/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': BOT_API_KEY,
        },
        body: JSON.stringify({
          token,
          guildId,
          userId: '1567751920645308548',
          ip: '127.0.0.1',
          isVpn: false,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          success: true,
          message: 'Verificação concluída com sucesso! Seus cargos foram atribuídos no Discord.',
        });
      } else {
        setResult({
          success: false,
          message: data.message || data.error || data.reason || 'Verificação não autorizada pelo bot.',
          altsFound: data.alts,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao comunicar com o servidor Fastify do bot');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-200 flex flex-col items-center justify-center p-4 font-sans relative selection:bg-gold selection:text-black">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#121217] border border-white/[0.08] p-8 shadow-2xl relative">
        {/* Brand Header - Bare logo sem card */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/logo.png" alt="Vanta" fill className="object-contain" priority />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Vanta <span className="text-gold font-mono text-xs">Security Gateway</span>
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Validando sessão segura...</p>
          </div>
        )}

        {/* Error / Invalid Token */}
        {!loading && error && !result && (
          <div className="py-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-danger/10 border border-danger/30 text-danger mx-auto flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-white">Sessão Inválida</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{error}</p>
            </div>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline font-medium"
              >
                Voltar à Página Inicial <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Session Valid - Ready to verify */}
        {!loading && session && !result && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#1c1c24] border border-white/5 space-y-2.5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">STATUS DA SESSÃO</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                  Token Ativo
                </span>
              </div>
              <div className="text-base font-bold text-white font-display">
                Portal de Verificação Vanta
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Clique no botão abaixo para autenticar sua conexão diretamente com o bot e liberar seus cargos no Discord.
              </p>
            </div>

            {/* Security checklist */}
            <div className="space-y-2 text-left text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold" />
                <span>Verificação de conexões proxy e VPN</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold" />
                <span>Criptografia de ponta a ponta AES-256-GCM</span>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold-hover text-black font-semibold text-sm transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                  <span>Verificando no Cluster...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Concluir Verificação</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Verification Success */}
        {result && result.success && (
          <div className="py-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-success/15 border border-success/40 text-success mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-white">Verificação Concluída</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{result.message}</p>
            </div>
            <p className="text-[11px] text-gray-500 font-mono">
              Seus cargos foram sincronizados. Você já pode fechar esta aba e voltar ao Discord.
            </p>
          </div>
        )}

        {/* Verification Blocked (Alt or VPN) */}
        {result && !result.success && (
          <div className="py-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-danger/15 border border-danger/40 text-danger mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-white">Verificação Bloqueada</h3>
              <p className="text-xs text-danger leading-relaxed">{result.message}</p>
            </div>
            {result.altsFound && result.altsFound.length > 0 && (
              <div className="p-3 rounded-lg bg-black/40 border border-danger/30 text-left text-xs font-mono text-gray-400">
                <span className="text-danger block text-[10px] mb-1">CONTAS SECUNDÁRIAS DETECTADAS:</span>
                {result.altsFound.join(', ')}
              </div>
            )}
            <p className="text-[11px] text-gray-500">
              Caso acredite que isso é um engano, entre em contato com a equipe pelo servidor de suporte.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <VerifyContent />
    </Suspense>
  );
}
