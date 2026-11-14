'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Activity, HelpCircle, Plus, Minus, RotateCcw } from 'lucide-react';
import type { SystemStatusDocument } from '@/types/status';

interface BotPreviewCardProps {
  botStatus?: SystemStatusDocument | null;
}

export function BotPreviewCard({ botStatus }: BotPreviewCardProps) {
  const [activeTab, setActiveTab] = useState<'ping' | 'help' | 'counter'>('ping');
  const [counter, setCounter] = useState(42);
  const [isUpdating, setIsUpdating] = useState(false);
  const [ping, setPing] = useState(
    botStatus?.network.wsPingMs && botStatus.network.wsPingMs > 0 ? botStatus.network.wsPingMs : 14
  );

  React.useEffect(() => {
    if (botStatus?.network.wsPingMs && botStatus.network.wsPingMs > 0) {
      setPing(botStatus.network.wsPingMs);
    }
  }, [botStatus]);

  const handleRefreshPing = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setPing(Math.floor(Math.random() * 4) + 12);
      setIsUpdating(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-[#1e1f22] border border-white/10 shadow-2xl overflow-hidden text-left font-sans">
      {/* Discord Header */}
      <div className="bg-[#18191c] px-4 py-2.5 border-b border-black/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-bold text-sm">#</span>
          <span className="text-xs text-gray-300 font-medium">comandos-vantinha</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>online</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#2b2d31]/60 px-4 py-2 flex items-center gap-2 border-b border-white/[0.06]">
        <button
          onClick={() => setActiveTab('ping')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
            activeTab === 'ping'
              ? 'bg-[#35373c] text-white border border-gold/40'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-gold" />
          <span>/ping</span>
        </button>
        <button
          onClick={() => setActiveTab('help')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
            activeTab === 'help'
              ? 'bg-[#35373c] text-white border border-gold/40'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>/help</span>
        </button>
        <button
          onClick={() => setActiveTab('counter')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
            activeTab === 'counter'
              ? 'bg-[#35373c] text-white border border-gold/40'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Plus className="w-3.5 h-3.5 text-gold" />
          <span>/counter</span>
        </button>
      </div>

      {/* Message Body */}
      <div className="p-4 bg-[#313338]">
        {/* Author info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-full bg-[#1e1f22] border border-white/[0.08] flex items-center justify-center flex-shrink-0 p-1 overflow-hidden">
            <Image
              src={botStatus?.bot.avatar || '/logo.png'}
              alt={botStatus?.bot.name || 'Vantinha'}
              width={34}
              height={30}
              className="object-contain rounded-full"
              priority
              unoptimized
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-white">
                {botStatus?.bot.name || 'Vantinha'}
              </span>
              <span className="text-[10px] bg-discord text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                APP
              </span>
              <span className="text-[11px] text-gray-400">hoje às 01:40</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5 font-mono">
              Assistente Oficial • Vantinha
            </p>
          </div>
        </div>

        {/* Tab 1: /ping */}
        {activeTab === 'ping' && (
          <div className="rounded-lg bg-[#2b2d31] border-l-2 border-gold p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Latência do Bot</div>
                <div className="text-[11px] text-gray-400">Conexão ativa com o Discord em tempo real</div>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-black/40 text-gold border border-gold/30">
                {ping}ms
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#1e1f22] p-2 rounded border border-white/[0.04]">
                <span className="text-gray-500 block text-[10px] font-mono">DISPONIBILIDADE</span>
                <span className="text-gray-200 font-mono">
                  {botStatus?.uptime.formatted || '99.9% Uptime'}
                </span>
              </div>
              <div className="bg-[#1e1f22] p-2 rounded border border-white/[0.04]">
                <span className="text-gray-500 block text-[10px] font-mono">SERVIDOR</span>
                <span className="text-gray-200 font-mono">
                  {botStatus?.guilds.list?.[0]?.name || 'Vanta Hub'}
                </span>
              </div>
            </div>

            <button
              onClick={handleRefreshPing}
              disabled={isUpdating}
              className="w-full py-1.5 px-3 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
              <span>{isUpdating ? 'Consultando...' : 'Atualizar métrica'}</span>
            </button>
          </div>
        )}

        {/* Tab 2: /help */}
        {activeTab === 'help' && (
          <div className="rounded-lg bg-[#2b2d31] border-l-2 border-gold p-3.5 space-y-2.5">
            <div className="text-xs font-bold text-white">Central de Comandos</div>
            <p className="text-[11px] text-gray-400">
              Controle o servidor com menus interativos rápidos e fáceis de usar.
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-[#1e1f22]">
                <span className="text-white">/help</span>
                <span className="text-gray-400 text-[11px]">Lista de comandos disponíveis</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#1e1f22]">
                <span className="text-white">/ping</span>
                <span className="text-gray-400 text-[11px]">Mede resposta do gateway</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#1e1f22]">
                <span className="text-white">/counter</span>
                <span className="text-gray-400 text-[11px]">Exemplo reativo sem refresh</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: /counter */}
        {activeTab === 'counter' && (
          <div className="rounded-lg bg-[#2b2d31] border-l-2 border-gold p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Contador Interativo</span>
              <span className="text-sm font-mono font-bold text-gold px-2.5 py-0.5 rounded bg-black/40 border border-gold/30">
                {counter}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Respostas instantâneas no chat ao clicar nos botões sem recarregar a tela.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setCounter((c) => c - 1)}
                className="py-1 px-2 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Minus className="w-3 h-3" /> -1
              </button>
              <button
                onClick={() => setCounter(0)}
                className="py-1 px-2 rounded bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setCounter((c) => c + 1)}
                className="py-1 px-2 rounded bg-gold hover:bg-gold-hover text-black text-xs font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" /> +1
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
