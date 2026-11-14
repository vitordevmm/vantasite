export interface SystemStatusDocument {
  id: "bot_status";
  updatedAt: string;       // Timestamp ISO da última coleta (ex: "2026-11-14T22:55:26.666Z")
  nextUpdateAt: string;    // Timestamp ISO da próxima atualização programada
  intervalMinutes: number; // 60

  // 1. Identidade & Presença
  bot: {
    id: string;            // ID oficial do bot no Discord
    username: string;      // "Vantinha"
    tag: string;           // "Vantinha#0419"
    name: string;          // "Vantinha"
    avatar: string | null; // URL direta do avatar CDN do Discord
    status: "online" | "idle" | "dnd" | "offline";
  };

  // 2. Servidores
  guilds: {
    total: number;         // Total de servidores onde o bot está ativo
    list: Array<{
      id: string;          // ID do servidor
      name: string;        // Nome do servidor
      icon: string | null; // URL do ícone da guilda
      memberCount: number; // Total de membros no servidor
      channelsCount: number;
      rolesCount: number;
    }>;
  };

  // 3. Membros
  members: {
    total: number;         // Soma de todos os membros de todas as comunidades
    cached: number;        // Membros armazenados em memória local
  };

  // 4. Canais
  channels: {
    total: number;         // Total de canais monitorados
    text: number;          // Canais de texto
    voice: number;         // Canais de voz
    categories: number;    // Categorias de canais
  };

  // 5. Rede & Conexão
  network: {
    wsPingMs: number;      // Latência do WebSocket Discord em milissegundos
    status: number;        // Código de status de conexão do Discord Gateway (0 = READY)
  };

  // 6. Uptime
  uptime: {
    processSeconds: number; // Segundos de execução contínua
    formatted: string;      // String formatada pronta (ex: "1d 4h 12m 30s")
    startedAt: string;      // Timestamp ISO da inicialização do bot
  };

  // 7. Métricas de Segurança do Ecossistema
  security: {
    totalUsers: number;                 // Usuários com dossiê no Firestore
    totalVerified: number;              // Usuários que concluíram verificação
    totalFlagged: number;               // Contas suspeitas marcadas
    totalBanned: number;                // Usuários banidos
    totalAlts: number;                  // Contas secundárias (alts) detectadas
    totalVpn: number;                   // Acessos por VPN/Proxy detectados
    activeVerificationSessions: number; // Sessões de verificação abertas no momento
  };

  // 8. Comandos Disponíveis
  commands: {
    total: number;         // Total de comandos registrados
    names: string[];       // Lista de nomes (ex: ["counter", "help", "ping"])
  };

  // 9. Recursos de Máquina (Exclusivo para Dashboard Administrativo)
  system: {
    nodeVersion: string;   // Versão do Node.js
    platform: string;      // SO (ex: "win32", "linux")
    arch: string;          // "x64", "arm64"
    memoryRssMb: number;   // Uso de RAM física (RSS) em MB
    memoryHeapUsedMb: number;
    memoryHeapTotalMb: number;
  };
}
