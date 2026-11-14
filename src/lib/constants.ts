export const PRODUCTION_URL = "https://vantasite-puce.vercel.app";

export const VANTA_CONSTANTS = {
  site: {
    url: PRODUCTION_URL,
    domain: "vantasite-puce.vercel.app",
  },
  bot: {
    name: "Vantinha",
    tag: "Vantinha#0419",
    tagline: "O assistente oficial de segurança e telemetria do Vantinha",
    id: "1567751920645308548",
    guildName: "Vanta Hub",
    guildId: "1567751748762869874",
    gatewayPort: 8080,
    cipher: "AES-256-GCM",
    status: "Online",
    uptime: "Online",
    wsPing: "85ms",
    inviteUrl: "https://discord.com/oauth2/authorize?client_id=1567751920645308548&permissions=8&integration_type=0&scope=bot+applications.commands",
    supportUrl: "https://discord.gg/vanta",
    authUrl: "https://discord.com/oauth2/authorize?client_id=1567751920645308548&response_type=code&redirect_uri=https%3A%2F%2Fvantasite-puce.vercel.app&scope=identify+guilds+guilds.join",
  },
  colors: {
    gold: "#E5A93C",
    vantaGold: "#E5A93C",
    goldLight: "#F5BE58",
    goldDark: "#9A6B1A",
    vanta: "#0a0a0c",
    vantaDark: "#121217",
    vantaLight: "#1c1c24",
    vantaAccent: "#E5A93C",
    vantaCyan: "#06b6d4",
    vantaBorder: "rgba(229, 169, 60, 0.18)",
    discord: "#5865F2",
    success: "#22c55e",
    danger: "#ED4245",
    warning: "#fbbd23",
  },
  features: [
    {
      title: "Verificação de Identidade com Detecção de Alts",
      description: "Identifica contas secundárias e perfis alternativos de forma automática, prevenindo fraudes e invasões no servidor.",
      category: "Segurança de Acesso",
    },
    {
      title: "Auditoria Ativa e Bloqueio de Proxy/VPN",
      description: "Analisa conexões suspeitas e bloqueia acessos de redes não autorizadas antes da concessão de permissões no servidor.",
      category: "Auditoria & Rede",
    },
    {
      title: "Comandos Interativos em Discord Components",
      description: "Interface moderna com botões nativos e componentes reativos (/counter, /help, /ping) com resposta instantânea no chat.",
      category: "Interface Nativa",
    },
  ],
  stats: [
    { value: "1", label: "Servidor ativo" },
    { value: "2", label: "Membros monitorados" },
    { value: "100%", label: "Uptime operacional" },
    { value: "3", label: "Comandos nativos" },
  ],
  commands: [
    {
      name: "/help",
      category: "Central de Ajuda",
      description: "Exibe o menu de auxílio, comandos disponíveis e orientações para membros e administradores.",
    },
    {
      name: "/ping",
      category: "Diagnóstico",
      description: "Mede com exatidão a latência da conexão com o Discord e o tempo de resposta em tempo real.",
    },
    {
      name: "/counter",
      category: "Interatividade",
      description: "Demonstração prática de contadores reativos com atualização de estado instantânea nos botões nativos.",
    },
  ],
};
