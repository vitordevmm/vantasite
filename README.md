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
## 🌐 Ecossistema & Acesso Oficial

O Vantinha é um sistema fechado e proprietário, operado exclusivamente para os servidores da **Comunidade Vanta**:

* **Adicionar o Bot**: [Convidar Vantinha para o seu Servidor](https://discord.com/oauth2/authorize?client_id=1567751920645308548&response_type=code&redirect_uri=localhost%3A3000&scope=identify+guilds+guilds.join)
* **Comunidade Oficial**: [Entrar no Vanta Hub](https://discord.gg/vanta)
* **Painel Web**: Autenticação segura via Discord OAuth2 disponível para membros autorizados.

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
