<div align="center">

  **🌐 Idiomas / Languages:**  
  [🇧🇷 Português (Brasil)](README.md) &nbsp;•&nbsp; [🇺🇸 English](README.en.md) &nbsp;•&nbsp; [🇪🇸 Español](README.es.md)

  <br/><br/>

  <img src="public/logo.png" alt="Vanta Logo" width="90" height="75" />

  # 🌌 VANTA SITE
  ### Portal Web Oficial & Dashboard de Segurança • Vantinha

  <p align="center">
    O portal oficial do ecossistema <strong>Vanta</strong> e do assistente <strong>Vantinha</strong> (<a href="https://discord.com"><code>Vantinha#0419</code></a>).<br/>
    Engenharia de alta performance, interface minimalista e integração direta com o cluster de segurança do servidor.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Fastify_Gateway-Porta_8080-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
    <img src="https://img.shields.io/badge/Criptografia-AES--256--GCM-E5A93C?style=for-the-badge" alt="AES-256-GCM" />
    <img src="https://img.shields.io/badge/Discord-Components_V2-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Components V2" />
  </p>

</div>

---

## 🏛️ Visão Geral da Arquitetura

O **Vanta Site** opera como a interface web primária da comunidade **Vanta Hub**, projetado segundo o princípio de **Master Data Gateway**:

```
                       ┌────────────────────────────────────────┐
                       │          NAVEGADOR / USUÁRIO           │
                       │    (Landing Page, Painel & Verify)     │
                       └───────────────────┬────────────────────┘
                                           │
                        Túnel Criptografado│ AES-256-GCM + API Key
                                           ▼
                       ┌────────────────────────────────────────┐
                       │         BOT MASTER DATA GATEWAY        │
                       │      (Fastify Server :8080 + Bot)      │
                       └───────────┬────────────────┬───────────┘
                                   │                │
                    Escrita Direta │                │ WebSocket Nativo
                    e Sincronização│                │ Components V2
                                   ▼                ▼
                       ┌────────────────┐    ┌──────────────────┐
                       │ Google Cloud   │    │ Discord Gateway  │
                       │ Firestore      │    │ (Canais, Cargos) │
                       └────────────────┘    └──────────────────┘
```

> 🛡️ **Princípio de Sigilo & Integridade**: O site nunca acessa o banco de dados diretamente. O bot Discord centraliza 100% dos cálculos de segurança, detecção de contas duplicadas, auditoria de conexões e manipulação de cargos no servidor.

---

## ⚡ Tecnologias & Ecossistema

### Frontend & Dashboard
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router com renderização híbrida estática/dinâmica).
* **Linguagem:** TypeScript com tipagem estrita de contratos de dados.
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) fundamentado nos tokens oficiais de design Vanta.
* **Tipografia Autoral:** `Space Grotesk` (títulos arquitetônicos) e `Plus Jakarta Sans` (leitura fluida).

### Bot & Backend do Cluster
* **Framework Bot:** `Constatic Framework` em ESM puro.
* **API de Comunicação:** `Fastify` rodando na porta `8080` com CORS aberto e validação por `x-api-key`.
* **Interface no Discord:** `100% Discord Components V2` (`@magicyan/discord`, containers, seções dinâmicas e flags `IsComponentsV2`).
* **Segurança Criptográfica:** Cifra `AES-256-GCM` com IV aleatório de 12 bytes, tag de autenticação de 16 bytes e derivação de chave de 32 bytes via SHA-256.
* **Banco de Dados:** Google Cloud Firestore sob o projeto de cluster `vantinha-e9fca`.

---

## 🛡️ Capacidades Centrais de Segurança

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ 1. DETECÇÃO GLOBAL DE ALTS (CONTAS DUPLICADAS)                         │
 │    Cruzamento de histórico de IPs conhecidos para detecção instantânea │
 │    de contas secundárias, vinculação de perfis e prevenção a raids.    │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 2. AUDITORIA DE REDE & BLOQUEIO DE PROXY/VPN                           │
 │    Análise de integridade de conexão antes da entrega de cargos,       │
 │    com registro detalhado no canal de logs do Discord.                 │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 3. PORTAL OFICIAL DE VERIFICAÇÃO COM TOKENS TEMPORÁRIOS                │
 │    Sessões únicas de 15 minutos geradas via botão no Discord,          │
 │    com queima de token e atribuição automática de permissões.          │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 4. COMANDOS NATIVOS INTERATIVOS                                        │
 │    /help: Central de auxílio, status do cluster e orientações          │
 │    /ping: Latência real do Gateway WS Discord (~85ms) e da API         │
 │    /counter: Contador reativo com persistência sem refresh             │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Cores Oficial (Design Tokens)

O ecossistema Vanta adota uma estética minimalista, austera e nobre:

| Token | Hex | Aplicação |
| :--- | :--- | :--- |
| **`vantaGold`** | `#E5A93C` | **Dourado Oficial Vanta** (Cor primária, CTAs e destaques) |
| **`vanta`** | `#0a0a0c` | Fundo principal da página (Vantablack aesthetic) |
| **`vantaDark`** | `#121217` | Fundo de cartões, modais, sidebars e containers |
| **`vantaLight`** | `#1c1c24` | Bordas sutis, divisórias e cartões secundários |
| **`vantaAccent`** | `#7c3aed` | Roxo elétrico (identidade do bot Discord e badges de sistema) |
| **`vantaCyan`** | `#06b6d4` | Ciano neon (gráficos, métricas ativas e indicadores online) |
| **`success`** | `#22c55e` | Verde esmeralda de aprovação e verificado |
| **`danger`** | `#ED4245` | Vermelho de alerta, banimento e bloqueio de alts |
| **`warning`** | `#fbbd23` | Amarelo de atenção para proxies ou contas suspeitas |

---

## 📂 Estrutura do Repositório

```
vantasite/
├── public/
│   └── logo.svg                 # Logo oficial Vanta (bare, sem contêineres)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── callback/    # Callback OAuth2 + sync de telemetria com o bot
│   │   │       ├── logout/      # Encerramento de sessão
│   │   │       └── me/          # Leitura de sessão HTTP-only
│   │   ├── callback/page.tsx    # Sequência visual de login (anel neon ouro para verde)
│   │   ├── dashboard/page.tsx   # Painel conectado ao Fastify :8080 (dados ao vivo)
│   │   ├── verify/page.tsx      # Portal de verificação de identidade de membros
│   │   ├── layout.tsx           # Configuração de fontes Space Grotesk e Plus Jakarta
│   │   └── page.tsx             # Landing page autoral com dados reais do bot
│   ├── components/
│   │   ├── BotPreviewCard.tsx   # Simulador interativo dos comandos (/help, /ping, /counter)
│   │   ├── Footer.tsx           # Rodapé da comunidade
│   │   ├── Navbar.tsx           # Barra de navegação com logo bare e login Discord
│   │   └── NeonAvatar.tsx       # Avatar com halo neon rotativo ouro/verde
│   └── lib/
│       ├── constants.ts         # Metadados e dados reais do bot Vantinha
│       ├── cryptoClient.ts      # Cliente criptográfico turnkey AES-256-GCM
│       └── discord.ts           # Auxiliares de API Discord e formatadores de avatar
├── .env.example                 # Modelo limpo de variáveis de ambiente
├── tailwind.config.ts           # Configuração de design tokens oficiais
├── tsconfig.json                # Configuração TypeScript
├── PROJECT_STATE.md             # Livro-razão contínuo de versões e decisões
└── README.md                    # Este manual
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** `>= 18.18.0` ou `>= 20.0.0`
* **NPM** ou gerenciador de pacotes equivalente
* O servidor do **Vantinha** rodando em `http://127.0.0.1:8080` (Fastify Gateway)

### 1. Clonar o Repositório
```bash
git clone https://github.com/vitordevmm/vantasite.git
cd vantasite
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e preencha suas chaves locais:
```bash
cp .env.example .env.local
```

### 4. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 5. Compilar para Produção
```bash
npm run build
npm run start
```

---

## 🔒 Governança e Ledger Contínuo

Este projeto segue o protocolo rigoroso do **Vanta Ledger**, mantendo o histórico de cada ciclo de melhoria documentado no arquivo [PROJECT_STATE.md](./PROJECT_STATE.md). Todas as diretrizes de código, regras de sigilo e padrões estéticos são rastreados de forma contínua.

---

## ⚖️ Licença e Política Anti-Plágio

Este projeto é protegido sob a **Proprietary Source Code License (All Rights Reserved)**.

> 🛑 **PROIBIÇÃO EXPRESSA DE CÓPIA E PLÁGIO**:  
> É expressamente proibida a cópia, clonagem, republicação, redistribuição, venda ou apropriação indevida deste código-fonte, identidade visual, design ou componentes, no todo ou em parte, em qualquer plataforma ou serviço concorrente.  
> Todos os direitos são reservados à **Comunidade Vanta** e ao autor **Vítor Dev** ([vitordevmm](https://github.com/vitordevmm)). Violações estão sujeitas a ações legais e pedidos imediatos de DMCA Takedown.

Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).

---

<div align="center">
  <p><strong>Comunidade Vanta</strong> • <em>Dourado & Vantablack</em></p>
  <p>© 2026 Vanta Hub. Todos os direitos reservados.</p>
</div>
