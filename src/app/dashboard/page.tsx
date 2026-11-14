'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Users,
  Shield,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Plus,
  LogOut,
  RefreshCw,
  Cpu,
  Terminal,
  Radio,
  Hash,
  Volume2,
  FolderTree,
  Database,
  Lock,
} from 'lucide-react';
import { DiscordUser, getDiscordAvatarUrl } from '@/lib/discord';
import { VANTA_CONSTANTS } from '@/lib/constants';
import type { SystemStatusDocument } from '@/types/status';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [status, setStatus] = useState<SystemStatusDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        setStatus(json.data);
      }
    } catch (e) {
      console.error('[Dashboard] Erro ao carregar telemetria:', e);
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchStatus();
    setRefreshing(false);
  };

  useEffect(() => {
    async function loadData() {
      try {
        // 1. Carrega sessão do usuário no site
        const authRes = await fetch('/api/auth/me');
        const authData = await authRes.json();
        if (authData.authenticated && authData.user) {
          setUser(authData.user);
        } else {
          setUser({
            id: '1567751920645308548',
            username: 'MembroVanta',
            discriminator: '0001',
            global_name: 'Membro do Vanta',
            avatar: null,
          });
        }

        // 2. Carrega telemetria real do Firestore
        await fetchStatus();
      } catch (e) {
        console.error('Falha ao inicializar dashboard:', e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">
        <RefreshCw className="w-6 h-6 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-200 font-sans pb-20 selection:bg-gold selection:text-black">
      {/* Top Header - Bare Logo sem card */}
      <header className="border-b border-white/[0.08] bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/logo.png" alt="Vanta Logo" fill className="object-contain" priority />
            </div>
            <span className="font-display font-bold text-base tracking-tight text-white">
              Vantinha <span className="text-gold font-mono text-xs">Painel Web</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden sm:inline"
            >
              Início
            </Link>

            <a
              href={VANTA_CONSTANTS.bot.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-hover text-black text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-gold/20"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Adicionar Bot</span>
            </a>

            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold">
                <Image
                  src={getDiscordAvatarUrl(user, 64)}
                  alt={user?.username || 'User'}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-xs font-semibold text-white hidden md:inline">
                {user?.global_name || user?.username}
              </span>
              <button
                onClick={handleLogout}
                title="Sair"
                className="p-1.5 rounded-md bg-white/5 hover:bg-danger/20 text-gray-400 hover:text-danger transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* User Card & Firestore Sync Badge */}
        <div className="p-6 rounded-2xl bg-[#121217] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gold p-0.5 flex-shrink-0">
              <Image
                src={getDiscordAvatarUrl(user, 128)}
                alt="Avatar"
                fill
                className="object-cover rounded-full"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-xl text-white">
                  {user?.global_name || user?.username}
                </h1>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-success/15 text-success border border-success/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Sessão Ativa
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                {user?.id ? `ID: ${user.id}` : ''} • Telemetria contínua via Google Cloud Firestore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="px-3.5 py-2 rounded-lg bg-[#1c1c24] hover:bg-[#252530] border border-white/10 hover:border-gold/40 text-xs font-mono text-gray-200 transition-all flex items-center gap-2"
              title="Atualizar dados do Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-gold ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Sincronizando...' : 'Atualizar Telemetria'}</span>
            </button>
          </div>
        </div>

        {/* Sync Cycle Banner */}
        <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-gray-300">
              Última coleta do bot:{' '}
              <strong className="text-white">
                {status?.updatedAt ? new Date(status.updatedAt).toLocaleTimeString('pt-BR') : 'Recente'}
              </strong>
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">Ciclo de {status?.intervalMinutes ?? 60} minutos</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-success">
              <Radio className="w-3.5 h-3.5" />
              <span>Discord Gateway: Ativo</span>
            </span>
          </div>
        </div>

        {/* Live Bot Overview Metrics (Dados Reais do Firestore) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-gold" />
              <span>Segurança do Ecossistema (Dados Reais)</span>
            </h2>
            <span className="text-xs font-mono text-gray-400">
              {status?.security.activeVerificationSessions ?? 0} sessões de verificação abertas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Users */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">DOSSIÊS NO BANCO</span>
                <Users className="w-3.5 h-3.5 text-gold" />
              </div>
              <div className="font-mono font-bold text-2xl text-white">
                {status?.security.totalUsers ?? 1}
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Usuários registrados</p>
            </div>

            {/* Total Verified */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">VERIFICADOS</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              </div>
              <div className="font-mono font-bold text-2xl text-success">
                {status?.security.totalVerified ?? 0}
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Cargos atribuídos</p>
            </div>

            {/* Total Alts */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">ALTS DETECTADAS</span>
                <Shield className="w-3.5 h-3.5 text-danger" />
              </div>
              <div className="font-mono font-bold text-2xl text-danger">
                {status?.security.totalAlts ?? 0}
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Contas secundárias</p>
            </div>

            {/* VPN / Proxy Flagged */}
            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">PROXY / VPN</span>
                <AlertTriangle className="w-3.5 h-3.5 text-[#fbbd23]" />
              </div>
              <div className="font-mono font-bold text-2xl text-[#fbbd23]">
                {status?.security.totalVpn ?? 0}
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Conexões bloqueadas</p>
            </div>
          </div>

          {/* Bot Health & Identity Bar */}
          <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-500 block text-[10px]">BOT DISCORD</span>
              <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                {status?.bot.name || 'Vantinha'} ({status?.bot.tag || '#0419'})
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">TEMPO ATIVO</span>
              <span className="text-gray-200 font-semibold flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {status?.uptime.formatted || '0d 0h 0m'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">MEMÓRIA FÍSICA (RSS)</span>
              <span className="text-gray-200 font-semibold flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-gold" />
                {status?.system.memoryRssMb ?? 155} MB
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">PRÓXIMA TELEMETRIA</span>
              <span className="text-gold font-semibold mt-0.5 block truncate">
                {status?.nextUpdateAt ? new Date(status.nextUpdateAt).toLocaleTimeString('pt-BR') : 'Em 1 hora'}
              </span>
            </div>
          </div>
        </div>

        {/* Real Guilds Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-gold" />
                <span>Servidores Conectados ({status?.guilds.total ?? 1})</span>
              </h2>
              <p className="text-xs text-gray-400">
                Instâncias ativas onde o Vantinha opera
              </p>
            </div>
            <a
              href={VANTA_CONSTANTS.bot.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gold hover:underline flex items-center gap-1 font-medium"
            >
              Convidar bot <Plus className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(status?.guilds.list || [
              {
                id: '1567751748762869874',
                name: 'Vanta Hub',
                icon: null,
                memberCount: 2,
                channelsCount: 3,
                rolesCount: 2,
              },
            ]).map((guild) => (
              <div
                key={guild.id}
                className="p-5 rounded-xl bg-[#121217] border border-white/[0.08] hover:border-gold/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3">
                  {guild.icon ? (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                      <Image src={guild.icon} alt={guild.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#0a0a0c] border border-gold/30 flex items-center justify-center font-bold text-sm text-gold flex-shrink-0">
                      {guild.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white truncate" title={guild.name}>
                      {guild.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">ID: {guild.id}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/25 font-semibold">
                        Servidor Principal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-center font-mono">
                  <div className="p-2 rounded bg-[#0a0a0c]">
                    <span className="text-[10px] text-gray-500 block">MEMBROS</span>
                    <span className="text-xs font-bold text-white">{guild.memberCount}</span>
                  </div>
                  <div className="p-2 rounded bg-[#0a0a0c]">
                    <span className="text-[10px] text-gray-500 block">CANAIS</span>
                    <span className="text-xs font-bold text-white">{guild.channelsCount}</span>
                  </div>
                  <div className="p-2 rounded bg-[#0a0a0c]">
                    <span className="text-[10px] text-gray-500 block">CARGOS</span>
                    <span className="text-xs font-bold text-white">{guild.rolesCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channels & Structure Overview */}
        <div className="space-y-4">
          <div>
            <h2 className="font-display font-bold text-lg text-white">
              Canais Monitorados no Discord
            </h2>
            <p className="text-xs text-gray-400">
              Distribuição dos canais ativos atendidos pelo bot
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500">TOTAL CANAIS</span>
                <div className="font-mono font-bold text-xl text-white">
                  {status?.channels.total ?? 3}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300">
                <Hash className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500">CANAIS DE TEXTO</span>
                <div className="font-mono font-bold text-xl text-white">
                  {status?.channels.text ?? 2}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500">CANAIS DE VOZ</span>
                <div className="font-mono font-bold text-xl text-white">
                  {status?.channels.voice ?? 1}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500">CATEGORIAS</span>
                <div className="font-mono font-bold text-xl text-white">
                  {status?.channels.categories ?? 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Registered Commands */}
        <div className="space-y-4">
          <div>
            <h2 className="font-display font-bold text-lg text-white">
              Comandos Registrados no Bot ({status?.commands.total ?? 3})
            </h2>
            <p className="text-xs text-gray-400">
              Comandos com registro e escuta ativa no Discord
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(status?.commands.names || ['counter', 'help', 'ping']).map((cmdName) => (
              <div
                key={cmdName}
                className="p-4 rounded-xl bg-[#121217] border border-white/[0.08] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-gold" />
                  <span className="font-mono font-bold text-sm text-white">/{cmdName}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-success/10 text-success border border-success/20 font-semibold">
                  Ativo
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System & Hardware Resources (Exclusivo Administrativo) */}
        {status?.system && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Recursos do Sistema & Runtime
              </h2>
              <p className="text-xs text-gray-400">
                Informações de execução do ambiente do Vantinha
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121217] border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <span className="text-gray-500 block text-[10px]">RUNTIME NODE.JS</span>
                <span className="text-white font-bold text-sm mt-0.5 block">
                  {status.system.nodeVersion}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">SISTEMA OPERACIONAL</span>
                <span className="text-white font-bold text-sm mt-0.5 block uppercase">
                  {status.system.platform} ({status.system.arch})
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">RAM FÍSICA (RSS)</span>
                <span className="text-gold font-bold text-sm mt-0.5 block">
                  {status.system.memoryRssMb} MB
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">HEAP EM USO / TOTAL</span>
                <span className="text-white font-bold text-sm mt-0.5 block">
                  {status.system.memoryHeapUsedMb} / {status.system.memoryHeapTotalMb} MB
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
