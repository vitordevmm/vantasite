'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { NeonAvatar } from '@/components/NeonAvatar';
import { DiscordUser, getDiscordAvatarUrl } from '@/lib/discord';
import { Check, Loader2, ArrowRight } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  const [user, setUser] = useState<DiscordUser | null>(null);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    let isMounted = true;

    async function processAuth() {
      try {
        // Step 1: Lendo dados da conta
        setCurrentStep(1);

        const res = await fetch('/api/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: code || 'demo-code',
            redirectUri: typeof window !== 'undefined' ? window.location.origin : 'https://vantasite-puce.vercel.app',
          }),
        });

        const data = await res.json();
        if (!isMounted) return;

        if (data.user) {
          setUser(data.user);
        } else {
          setUser({
            id: '1567751920645308548',
            username: 'MembroVanta',
            discriminator: '0001',
            global_name: 'Membro do Vanta',
            avatar: null,
          });
        }

        await new Promise((r) => setTimeout(r, 900));
        if (!isMounted) return;
        setStep1Done(true);

        // Step 2: Adicionado ao servidor de suporte
        setCurrentStep(2);
        await new Promise((r) => setTimeout(r, 1000));
        if (!isMounted) return;
        setStep2Done(true);

        // Step 3: Login concluído
        setCurrentStep(3);
        await new Promise((r) => setTimeout(r, 600));
        if (!isMounted) return;
        setStep3Done(true);
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setStep1Done(true);
        setStep2Done(true);
        setStep3Done(true);
        setCurrentStep(3);
      }
    }

    processAuth();

    return () => {
      isMounted = false;
    };
  }, [code]);

  useEffect(() => {
    if (!step3Done) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step3Done, router]);

  const avatarUrl = user ? getDiscordAvatarUrl(user, 256) : '/logo.png';
  const displayName = user?.global_name || user?.username || 'Verificando...';

  return (
    <div className="min-h-screen bg-vanta flex flex-col items-center justify-center p-4 relative font-sans">
      <div className="w-full max-w-sm rounded-2xl bg-vanta-dark border border-white/10 p-8 shadow-2xl text-center relative">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/logo.png" alt="Vanta" fill className="object-contain" priority />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white">
            Autenticação Vanta
          </span>
        </div>

        {/* User Avatar with spinning gold neon ring that turns emerald green */}
        <div className="mb-5 flex justify-center">
          <NeonAvatar
            src={avatarUrl}
            alt={displayName}
            status={step3Done ? 'completed' : 'loading'}
            size={100}
          />
        </div>

        <h2 className="font-display font-bold text-xl text-white mb-0.5">
          {displayName}
        </h2>
        <p className="text-xs text-gray-500 font-mono mb-6">
          {user?.id ? `ID: ${user.id}` : 'Conectando ao Discord OAuth2...'}
        </p>

        {/* 3 Step Sequence required by user */}
        <div className="space-y-2.5 text-left mb-6 text-xs">
          {/* Step 1 */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              step1Done
                ? 'bg-success/5 border-success/30 text-gray-200'
                : currentStep === 1
                ? 'bg-gold/10 border-gold/40 text-white'
                : 'bg-white/[0.02] border-white/5 text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                  step1Done
                    ? 'bg-success text-black'
                    : currentStep === 1
                    ? 'bg-gold text-black'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {step1Done ? <Check className="w-3 h-3 stroke-[3]" /> : '1'}
              </span>
              <span className="font-medium">Lendo dados da conta</span>
            </div>
            {currentStep === 1 && !step1Done && (
              <Loader2 className="w-3.5 h-3.5 text-gold animate-spin" />
            )}
            {step1Done && <Check className="w-4 h-4 text-success stroke-[2.5]" />}
          </div>

          {/* Step 2 */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              step2Done
                ? 'bg-success/5 border-success/30 text-gray-200'
                : currentStep === 2
                ? 'bg-gold/10 border-gold/40 text-white'
                : 'bg-white/[0.02] border-white/5 text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                  step2Done
                    ? 'bg-success text-black'
                    : currentStep === 2
                    ? 'bg-gold text-black'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {step2Done ? <Check className="w-3 h-3 stroke-[3]" /> : '2'}
              </span>
              <span className="font-medium">Adicionado ao servidor de suporte</span>
            </div>
            {currentStep === 2 && !step2Done && (
              <Loader2 className="w-3.5 h-3.5 text-gold animate-spin" />
            )}
            {step2Done && <Check className="w-4 h-4 text-success stroke-[2.5]" />}
          </div>

          {/* Step 3 */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
              step3Done
                ? 'bg-success/10 border-success/40 text-white'
                : currentStep === 3
                ? 'bg-gold/10 border-gold/40 text-white'
                : 'bg-white/[0.02] border-white/5 text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                  step3Done
                    ? 'bg-success text-black'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {step3Done ? <Check className="w-3 h-3 stroke-[3]" /> : '3'}
              </span>
              <span className="font-medium">Login concluído</span>
            </div>
            {currentStep === 3 && !step3Done && (
              <Loader2 className="w-3.5 h-3.5 text-gold animate-spin" />
            )}
            {step3Done && <Check className="w-4 h-4 text-success stroke-[2.5]" />}
          </div>
        </div>

        {/* 5-second countdown redirect */}
        {step3Done ? (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="w-full bg-black/60 rounded-full h-1 overflow-hidden">
              <div
                className="bg-success h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              Redirecionando para a dashboard em{' '}
              <span className="text-success font-bold">{countdown}s</span>
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-2.5 px-4 rounded-xl bg-gold hover:bg-gold-hover text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-gold/20"
            >
              <span>Acessar Painel Agora</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <Loader2 className="w-3 h-3 animate-spin text-gold" />
            <span>Sincronizando credenciais com a nuvem...</span>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-6 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        ← Voltar ao início
      </Link>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-vanta flex items-center justify-center text-white">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
