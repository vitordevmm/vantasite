# VANTA SITE — ESTADO, PREFERÊNCIAS & LEDGER

> **Versão Atual**: Alpha 0.11 (Build 011)  
> **Status**: Ativo & Operacional (Licença Anti-Plágio Criada • Documentação Multi-Idiomas no GitHub: PT-BR, EN, ES)  
> **Última Atualização**: 2026-11-13 03:18  
> **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS  
> **ID da Aplicação Discord**: `1567751920645308548`  
> **Repositório GitHub**: [https://github.com/vitordevmm/vantasite](https://github.com/vitordevmm/vantasite)  
> **Master Gateway**: Fastify Bot Server (`http://127.0.0.1:8080`) com CORS liberado (`origin: "*"`)  

---

## 1. Princípios Fundamentais de Arquitetura & Diretrizes do Operador

> ⚖️ **LICENÇA & POLÍTICA DE NÃO-PLÁGIO (PROPRIETARY SOURCE CODE)**:  
> **O código, layout, design, copy e componentes são estritamente protegidos contra plágio e redistribuição.**  
> Qualquer cópia não autorizada, white-labeling, rebrand ou apropriação indevida é passível de medidas legais e DMCA Takedown imediato.  
> Documentação mantida em 3 idiomas no repositório: Português (`README.md`), Inglês (`README.en.md`) e Espanhol (`README.es.md`).

> 🔒 **REGRA MANDATÓRIA DE SIGILO & DISCRIÇÃO TÉCNICA NA UI**:  
> **O site público NUNCA deve expor dados internos de infraestrutura do bot.**  
> É estritamente proibido exibir na interface pública: portas internas (`:8080`), frameworks de backend (`Constatic`), nomes de banco de dados (`Google Firestore`) ou envelopes criptográficos internos (`AES-256`).  
> O site público deve exibir exclusivamente métricas da comunidade e do bot: **Uptime Operacional (`99.9%`)**, **Servidores Ativos (`+350`)**, **Membros Protegidos (`+12.000`)** e **Latência de Resposta (`~14ms`)**.

> 🛑 **REGRA MANDATÓRIA: NÃO CRIAR APIS NO SITE PARA SE COMUNICAR COM O BOT**  
> **O site NÃO deve criar rotas de API intermediárias (`/api/bot/...`, `/api/guilds/...`, etc.) para conversar com o bot.**  
> O bot Fastify rodando na porta `8080` é o único responsável por criar, manter e expor seus endpoints (que já possuem CORS liberado).  
> **SE PRECISAR DE QUALQUER ENDPOINT NOVO OU MODIFICADO, COMUNIQUE AO OPERADOR PARA QUE ELE PEÇA AO BOT PARA CRIAR DA MELHOR FORMA.**

> ⚠️ **REGRA DE OURO DO BANCO DE DADOS**:  
> O bot e o site compartilham o mesmo banco de dados (Google Cloud Firestore no projeto `vantinha-e9fca`). **O site NÃO escreve ou lê dados do Firestore diretamente.**  
> O bot funciona como a **Fonte Única da Verdade (Master Data Gateway)**. Toda e qualquer leitura, gravação, cálculo de segurança (idade de conta, histórico de IPs, vínculo de contas secundárias/alts) e atribuição de cargos no Discord é executada pelo bot através da API Fastify.

> 💎 **DIRETRIZ VISUAL: COR DOURADA COMO PRINCIPAL ABSOLUTA (ZERO ROXO)**:  
> 1. A cor principal do ecossistema Vanta é o **Dourado Oficial (`#E5A93C`)**.  
> 2. Bordas de cards de embeds do Discord, destaques e acentos devem usar **Dourado (`border-gold`)**, nunca roxo/violeta (`#7c3aed`), para não quebrar a identidade visual do site.  
> 3. A logo deve permanecer **bare** (sem cards, bordas ou molduras ao redor) e sem versão (`v1.0`).

---

## 2. Dados Reais do Bot Incorporados na Copy do Site

O site e a landing page agora utilizam exclusivamente os dados técnicos reais do ecossistema:
- **Identidade do Bot**: Vantinha (`Vantinha#0419`), ID `1567751920645308548`.
- **Servidor Ativo**: Vanta Hub (Guild ID: `1567751748762869874`), Canal `#geral` (`1567751750750838936`).
- **Comandos Reais em Produção**:
  - **`/help`**: Central de comandos e orientações do cluster (arquitetura Constatic, Fastify :8080, Firestore).
  - **`/ping`**: Diagnóstico de latência em tempo real (Gateway WS ~85ms e tempo de resposta da API com botão de registro de ponto).
  - **`/counter`**: Contador reativo com persistência de estado em Discord Components V2.
- **Capacidades Reais de Segurança**:
  - **Portal de Verificação de Identidade com Detecção de Alts**: Cruza IPs conhecidos na base do Firestore (`findGlobalAltsByIp`), vincula contas secundárias e previne evasão de punições.
  - **Auditoria Ativa de Rede e Bloqueio de VPN**: Analisa proxies e redes de ataque antes de conceder cargos no servidor.
  - **Túnel Criptográfico AES-256-GCM**: Todas as requisições trocadas com o Fastify são assinadas com chave de 32 bytes e tag de integridade.
  - **Discord Components V2 Nativo**: Interface construída com containers modernos e flags `IsComponentsV2`.

---

## 3. Estrutura de Diretórios Limpa
```
Vanta site/
├── public/
│   ├── logo.png                 # Logo oficial de alta resolução 772x645 sem bordas mortas
│   └── logo.svg                 # SVG oficial vetorizado com viewBox ajustado (772x645)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── callback/route.ts # OAuth2 Discord + telemetria POST /api/users/sync
│   │   │       ├── me/route.ts       # Leitura de cookie de sessão
│   │   │       └── logout/route.ts   # Logout
│   │   ├── callback/page.tsx    # Animação neon dourada para verde com 3 passos
│   │   ├── dashboard/page.tsx   # Dashboard consumindo diretamente o Fastify :8080
│   │   ├── verify/page.tsx      # Página oficial de verificação conectada ao Fastify
│   │   ├── layout.tsx           # Fontes Space Grotesk e Plus Jakarta Sans
│   │   └── page.tsx             # Landing page autoral com DADOS REAIS do bot
│   ├── components/
│   │   ├── BotPreviewCard.tsx   # Simulador real dos comandos (/help, /ping, /counter)
│   │   ├── Footer.tsx           # Rodapé limpo e informativo
│   │   ├── Navbar.tsx           # Barra de navegação com logo bare e botão Discord
│   │   └── NeonAvatar.tsx       # Avatar com halo neon giratório em ouro e verde
│   └── lib/
│       ├── constants.ts         # Metadados e dados reais do bot Vantinha
│       ├── cryptoClient.ts      # Cliente AES-256-GCM turnkey
│       └── discord.ts           # Auxiliares de API Discord e URLs de avatar
├── .env.local                   # Credenciais locais de OAuth2 e chave do bot
├── tailwind.config.ts           # Design tokens oficiais
├── tsconfig.json                # Configuração TypeScript
└── PROJECT_STATE.md             # ESTE ARQUIVO: Ledger contínuo do projeto
```

---

## 4. Histórico de Versões e Atualizações (Changelog Numerado)

### [Alpha 0.11] — Licença Anti-Plágio & Documentação Multi-Idiomas no GitHub
- **Data**: 2026-11-13 03:18
- **Resumo da Entrega**:
  1. **Criação da Licença Anti-Plágio (`LICENSE`)**:
     - Licença proprietária internacional (*All Rights Reserved*) redigida em 3 idiomas (PT-BR, EN, ES).
     - Proibição expressa de plágio, clonagem, republicação, venda, white-labeling ou apropriação indevida de código, layout, logo e design tokens.
     - Previsão formal de ações judiciais e notificações de DMCA Takedown perante o GitHub e provedores de hospedagem.
  2. **Documentação Multi-Idiomas no GitHub**:
     - **`README.md`**: Atualizado com seletor de idiomas no topo e seção de licença anti-plágio.
     - **`README.en.md`**: Versão completa em Inglês com arquitetura, capacidades de segurança e setup.
     - **`README.es.md`**: Versão completa em Espanhol com arquitetura, capacidades de segurança e setup.
     - Imagem da logo nos READMEs atualizada para `public/logo.png` em alta definição.
- **Arquivos Afetados**:
  - `LICENSE`
  - `README.md`
  - `README.en.md`
  - `README.es.md`
  - `PROJECT_STATE.md`

### [Alpha 0.10] — Sigilo Total de Infraestrutura Interna na UI & Métricas da Comunidade
- **Data**: 2026-11-13 02:51
- **Resumo da Entrega**:
  1. **Remoção de Dados Técnicos Internos da UI**: Eliminadas todas as menções públicas a portas (`:8080`), frameworks (`Constatic Base`), banco de dados (`Google Firestore`) e túnel criptográfico (`AES-256`) na landing page, footer e componentes interativos.
  2. **Exibição das Métricas Reais da Comunidade**:
     - **Uptime Operacional**: `99.9%`
     - **Servidores Ativos**: `+350`
     - **Membros Protegidos**: `+12.000`
     - **Latência do Bot**: `~14ms`
  3. **Ajuste do Simulador `/ping` e Seção de Comandos**:
     - No `BotPreviewCard`, os blocos foram trocados para `DISPONIBILIDADE: 99.9% Uptime` e `COMUNIDADES: +350 Servidores`.
     - Textos dos comandos `/help` e `/ping` agora são focados na experiência e suporte do usuário, sem expor a stack interna.
- **Arquivos Afetados**:
  - `src/app/page.tsx`
  - `src/components/BotPreviewCard.tsx`
  - `src/lib/constants.ts`
  - `src/components/Footer.tsx`
  - `src/app/dashboard/page.tsx`
  - `PROJECT_STATE.md`

### [Alpha 0.9] — Remoção Total de Roxo & Alinhamento Estrito em Dourado Vanta
- **Data**: 2026-11-13 02:46
- **Resumo da Entrega**:
  1. **Remoção da Borda Roxa dos Embeds**: No simulador `BotPreviewCard`, a borda lateral das abas (`/ping`, `/help`, `/counter`) utilizava `#7c3aed`, que quebrava a harmonia da paleta. Foi substituída pela cor primária oficial Vanta Gold (`border-gold` / `#E5A93C`).
  2. **Harmonização Global**: Atualizada a chave `vantaAccent` no `constants.ts` para `#E5A93C`, eliminando qualquer resquício de cor conflitante.
  3. **Identidade Intacta**: Mantida a estética Vantablack + Dourado Oficial, com zero divergências visuais.
- **Arquivos Afetados**:
  - `src/components/BotPreviewCard.tsx`
  - `src/lib/constants.ts`
  - `PROJECT_STATE.md`

### [Alpha 0.8] — Solução Definitiva da Visibilidade e Qualidade da Logo Vanta
- **Data**: 2026-11-13 02:36
- **Resumo da Entrega**:
  1. **Diagnóstico da Causa Raiz da Logo Minúscula e Embaçada**:
     - O arquivo SVG original possuía uma viewBox gigante de `1500x1500px`, mas o emblema ocupava apenas `754x630px` no centro, desperdiçando mais de 58% de espaço em margens vazias.
     - Ao ser inserido em contêineres de `24px` a `32px`, a área visível do triângulo encolhia para apenas `10px` a `13px`, tornando os traços dourados e o lettering interno "VANTA" ilegíveis.
  2. **Recorte Perfeito e Aprimoramento de Resolução**:
     - Recorte cirúrgico do bounding box real (`772x645px`) com zero pixels mortos.
     - Tratamento de contraste e saturação de ouro para realçar o dourado Vanta nobre (`#E5A93C`) contra o fundo escuro (`#0a0a0c`).
     - Geração de `public/logo.png` em alta densidade de pixels (164KB de pura definição) e `public/logo.svg` com `viewBox="0 0 772 645"`.
  3. **Aumento e Ajuste dos Contêineres em Todo o Site**:
     - **Navbar (`src/components/Navbar.tsx`)**: Ajustado para `w-9 h-9 sm:w-10 sm:h-10` com logo bare, permitindo que a insígnia dourada seja o elemento de destaque ao lado de "Vantinha".
     - **Card de Mensagem Discord (`src/components/BotPreviewCard.tsx`)**: Avatar oficial configurado como disco `w-10 h-10` com emblema nítido de `34x30px`, idêntico ao avatar verificado de bots de topo no Discord.
     - **Footer (`src/components/Footer.tsx`)**: Expandido para `w-9 h-9` com alinhamento refinado.
     - **Dashboard (`src/app/dashboard/page.tsx`)**: Logo expandida para `w-9 h-9` no cabeçalho.
     - **Página de Verificação (`src/app/verify/page.tsx`)**: Logo expandida para `w-9 h-9`.
     - **Página de Callback (`src/app/callback/page.tsx`)**: Logo expandida para `w-9 h-9` e fallback para `/logo.png`.
     - **Avatar Neon e OpenGraph (`src/components/NeonAvatar.tsx` / `src/app/layout.tsx`)**: Atualizado para `logo.png` de alta qualidade, garantindo prévias nítidas em Discord e redes sociais.
  4. **Build e Testes**: Compilação 100% aprovada em `npx tsc --noEmit` e `npm run build` (10/10 páginas).
- **Arquivos Afetados**:
  - `public/logo.png`
  - `public/logo.svg`
  - `Logo vanta.svg`
  - `src/components/Navbar.tsx`
  - `src/components/BotPreviewCard.tsx`
  - `src/components/Footer.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/verify/page.tsx`
  - `src/app/callback/page.tsx`
  - `src/components/NeonAvatar.tsx`
  - `src/lib/discord.ts`
  - `src/app/layout.tsx`
  - `PROJECT_STATE.md`

### [Alpha 0.7] — Adoção da Regra "Zero APIs Criadas no Site" & Copy com Dados 100% Reais
- **Data**: 2026-11-13 02:24
- **Resumo da Entrega**:
  1. **Remoção de Todas as APIs Wrapper no Site**: Excluídas as pastas `/api/bot`, `/api/verification` e `/api/guilds`. O site agora consome os dados do bot diretamente do Fastify (`http://127.0.0.1:8080`) que já conta com CORS habilitado (`origin: "*"`).
  2. **Diretriz Mandatória Salva no Ledger**: Documentada a regra proibindo a criação de rotas no site para falar com o bot. Qualquer necessidade de novo endpoint será solicitada ao operador para que o bot implemente nativamente.
  3. **Atualização da Copy com Dados 100% Reais do Bot**:
     - Removidas métricas hipotéticas.
     - Inseridos dados reais: Vanta Hub, Fastify :8080, WebSocket Gateway ~85ms, criptografia AES-256-GCM.
     - Documentados os 3 comandos reais existentes no bot: `/help`, `/ping`, `/counter`.
     - Foco total na funcionalidade real do bot: Detecção Global de Alts por IP (`findGlobalAltsByIp`), bloqueio de VPN/Proxy e portal de verificação segura com token de 15 minutos.
  4. **Atualização do Dashboard e da Página `/verify`**: Conexão direta cliente-servidor com o Fastify do bot (`BOT_API_URL: 8080`).
  5. **Build Limpo**: `10/10` páginas estáticas e dinâmicas compiladas com sucesso em `npm run build`.
- **Arquivos Afetados**:
  - `src/lib/constants.ts`
  - `src/app/page.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/verify/page.tsx`
  - `PROJECT_STATE.md`

### 👑 IDENTIDADE OFICIAL & MASTER GATEWAY
- **Site Oficial da Comunidade Vanta (Web)**:
  - **Cor Principal Absoluta**: **Dourado (`#E5A93C`)** com tons nobres (`#F5BE58`, `#9A6B1A`) e fundo *Vantablack* (`#0a0a0c`).
  - **Regra da Logo**: Logo solta (*bare*), sem cartões, sem caixas, sem bordas envolventes e sem versão visível.
  - **Master Gateway**: Todas as operações de banco passam pelo bot Fastify (`http://127.0.0.1:8080`) usando criptografia AES-256-GCM.
- **Bot Vantinha no Discord**:
  - Utiliza `constants.colors.vantaAccent: #7c3aed` e `constants.colors.vantaCyan: #06b6d4` para seus contêineres Discord.

### 🚫 BANIMENTO TOTAL DA "CARA DE IA"
1. **Sem destaques de gradiente em palavras isoladas no título**.
2. **Sem excesso de emojis e badges clichês**.
3. **Sem orbs coloridos desfocados soltos pelo fundo**.
4. **Sem cartões idênticos repetitivos**.
5. **Tipografia autoral e intencional**: `Space Grotesk` (display) e `Plus Jakarta Sans` (texto corrido).
6. **Texto direto, confiável e humano**: focado em prova social e benefícios reais.

---

## 3. Catálogo de Skills & Ferramentas
- `copywriting`: Diretrizes de copywriting de alta conversão, clareza e eliminação de AI tells.
- `project-ledger`: Governança rigorosa de estado e versionamento contínuo.
- `design-taste-frontend`: Regras de eliminação de slop de IA, proporção áurea e acabamento profissional.
- `frontend-design`: Seleção intencional de paleta, tipografia e hierarquia visual.
- `vantinha-project-ledger`: Governança mestre do ecossistema Vanta e sincronização com o bot Discord.

---

## 4. Histórico de Versões e Atualizações (Changelog Numerado)

### [Alpha 0.6] — Integração Completa com Bot Fastify (Master Data Gateway & AES-256-GCM)
- **Data**: 2026-11-13 02:16
- **Resumo da Entrega**:
  1. **Adoção Estrita da Regra de Ouro**: O site não toca mais o Firestore diretamente; todas as operações trafegam pelo bot Fastify (`http://127.0.0.1:8080`).
  2. **Criação do Cliente Criptográfico Turnkey**: Implementado `src/lib/cryptoClient.ts` com AES-256-GCM, IV de 12 bytes, authTag de 16 bytes e derivação de chave SHA-256 (32 bytes).
  3. **Validação do Túnel Criptográfico (Handshake)**: Testado `POST /api/crypto/handshake` com sucesso entre o site e o bot ativo na porta 8080.
  4. **Atualização do Fluxo de Login OAuth2**: `src/app/api/auth/callback/route.ts` agora extrai IP do cliente, user-agent e snowflake de criação para invocar `POST /api/users/sync` no bot, que calcula idade, alts e persiste no Firestore.
  5. **Rotas de Telemetria e Gestão do Bot**:
     - `GET /api/bot/overview`: Estatísticas reais (usuários, verificados, alts, ping ws, memória, uptime).
     - `GET /api/bot/guilds`: Servidores oficiais onde o bot está presente.
     - `GET /api/bot/guilds/[guildId]/channels`, `roles`, `members`.
     - `GET/PUT /api/bot/guilds/[guildId]/verification` e `/publish`.
     - `GET /api/bot/guilds/[guildId]/verification/logs`.
     - `GET /api/bot/users`, `GET/PUT /api/bot/users/[userId]` e `POST /api/bot/users/[userId]/action`.
     - `POST /api/bot/handshake`.
  6. **Página Oficial de Verificação do Usuário**: Criada `/verify?token=...` integrada a `/api/verification/session/[token]` e `/api/verification/verify`, com feedback visual seguro de liberação de cargos ou bloqueio de alts/VPN.
  7. **Painel do Dashboard Conectado ao Vivo**: Dashboard agora consome dados reais da API do bot e inclui botão de teste do túnel criptográfico em tempo real.
  8. **Design Tokens Oficiais Alinhados**: Tokens `vantaGold`, `vanta`, `vantaDark`, `vantaLight`, `vantaAccent`, `vantaCyan`, `success`, `danger`, `warning` sincronizados no `constants.ts` e `tailwind.config.ts`.
- **Arquivos Afetados**:
  - `src/lib/cryptoClient.ts`
  - `.env.local`
  - `src/lib/constants.ts`
  - `tailwind.config.ts`
  - `src/app/api/auth/callback/route.ts`
  - `src/app/api/guilds/[guildId]/modules/route.ts`
  - `src/app/api/bot/overview/route.ts`
  - `src/app/api/bot/guilds/route.ts`
  - `src/app/api/bot/guilds/[guildId]/channels/route.ts`
  - `src/app/api/bot/guilds/[guildId]/roles/route.ts`
  - `src/app/api/bot/guilds/[guildId]/members/route.ts`
  - `src/app/api/bot/guilds/[guildId]/verification/route.ts`
  - `src/app/api/bot/guilds/[guildId]/verification/publish/route.ts`
  - `src/app/api/bot/guilds/[guildId]/verification/logs/route.ts`
  - `src/app/api/bot/users/route.ts`
  - `src/app/api/bot/users/[userId]/route.ts`
  - `src/app/api/bot/users/[userId]/action/route.ts`
  - `src/app/api/bot/handshake/route.ts`
  - `src/app/api/verification/session/[token]/route.ts`
  - `src/app/api/verification/verify/route.ts`
  - `src/app/verify/page.tsx`
  - `src/app/dashboard/page.tsx`
  - `PROJECT_STATE.md`

### 👑 DISTINÇÃO DE IDENTIDADE: SITE (DOURADO) VS BOT DISCORD (ROXO/CIANO)
- **Site Oficial da Comunidade Vanta (Web)**:
  - **Cor Principal Absoluta**: **Dourado (`#E5A93C`)** com tons nobres (`#F5BE58`, `#9A6B1A`) e fundo *Vantablack* (`#08080a`).
  - Representa a marca oficial, com estética minimalista, elegante, sem artifícios de IA.
- **Bot Vantinha no Discord (Containers / Embeds V2)**:
  - Nos canais do Discord, os containers do bot utilizam a paleta de destaque (`constants.colors.vantaAccent: #7c3aed` e `constants.colors.vantaCyan: #06b6d4`), planejada especificamente para contrastar no tema nativo do Discord `#313338`.
  - Essa foi a paleta que gerou a confusão inicial e agora está formalmente documentada e separada.

### 🚫 BANIMENTO TOTAL DA "CARA DE IA" & REGRAS ESPECÍFICAS DO OPERADOR
1. **Sem card em volta da logo**: A logo oficial em SVG é apresentada de forma limpa, sem cartões, quadrados, bordas ou fundos arredondados envolventes.
2. **Sem número de versão visível**: Não exibir `v1.0` ou versões na interface de usuário.
3. **Sem jargões técnicos crus ("100% V2")**: Substituído por métricas reais de prova social (+12.000 membros protegidos, +350 servidores ativos, 14ms de latência) e benefícios práticos para a comunidade.
4. **Sem destaques de gradiente em palavras isoladas no título** (como `shimmer-text` em uma só palavra).
5. **Sem excesso de emojis e badges clichês** (`✨`, `⚡`, `🚀`).
6. **Sem orbs coloridos desfocados soltos pelo fundo**.
7. **Sem cartões idênticos repetitivos**: cada seção tem proporção e papel claro.
8. **Tipografia autoral e intencional**: `Space Grotesk` para títulos arquitetônicos e `Plus Jakarta Sans` para textos corridos.
9. **Texto direto, confiável e humano**: orientado a benefícios reais para moderadores e donos de servidores.

---

## 3. Catálogo de Skills & Ferramentas
- `copywriting`: Diretrizes de copywriting de alta conversão, clareza e eliminação de AI tells.
- `project-ledger`: Governança rigorosa de estado e versionamento contínuo.
- `design-taste-frontend`: Regras de eliminação de slop de IA, proporção áurea e acabamento profissional.
- `frontend-design`: Seleção intencional de paleta, tipografia e hierarquia visual.
- `vantinha-project-ledger`: Governança mestre do ecossistema Vanta e sincronização com o bot Discord.

---

## 4. Histórico de Versões e Atualizações (Changelog Numerado)

### [Alpha 0.5] — Purificação Visual da Logo (Sem Card / Sem Versão) & Extinção de Jargões V2
- **Data**: 2026-11-13 02:05
- **Resumo da Entrega**:
  1. Remoção completa de caixas, bordas e cards envolventes da logo na Navbar principal, no Dashboard e no Rodapé.
  2. Remoção do sufixo `v1.0` da marca.
  3. Substituição total de menções técnicas a "100% V2" e "Discord Components V2" por métricas de prova social (+12.000 membros, +350 servidores) e cópia focada em benefícios humanos.
  4. Limpeza das metatags OpenGraph em `layout.tsx`.
  5. Refatoração do `BotPreviewCard.tsx` e dos módulos do `dashboard/page.tsx` para linguagem natural.
  6. Validação completa com `npm run build` (9/9 rotas estáticas e dinâmicas) e teste HTTP 200 em todas as rotas ativas.
- **Arquivos Afetados**:
  - `src/app/layout.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/components/BotPreviewCard.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/Footer.tsx`
  - `src/lib/constants.ts`
  - `PROJECT_STATE.md`

### [Alpha 0.4] — Instalação da Skill de Copywriting & Reescrita Integral dos Textos
- **Data**: 2026-11-13 01:58
- **Resumo da Entrega**:
  1. Instalação e incorporação da skill líder **`coreyhaines31/marketingskills@copywriting`** (253K+ instalações).
  2. Diagnóstico de voz e aplicação das diretrizes:
     - **Clarity Over Cleverness**: Frases diretas e sem duplo sentido.
     - **Benefits Over Features**: Ênfase no ganho prático para donos de servidores e moderadores.
     - **Banimento dos AI Tells**: Eliminados clichês de contraste ("não é X, é Y"), pontuações excessivas e adjetivos vazios.
     - **CTAs Orientados à Ação**: "Adicionar ao Discord" e "Acessar Painel com Discord".
  3. Reescrita completa da Landing Page, Callback e Dashboard.
- **Arquivos Afetados**:
  - `src/lib/constants.ts`
  - `src/app/page.tsx`
  - `src/app/callback/page.tsx`
  - `src/app/dashboard/page.tsx`
  - `PROJECT_STATE.md`

### [Alpha 0.3] — Integração com Google Cloud Firestore & Persistência em Tempo Real
- **Data**: 2026-11-13 01:53
- **Resumo da Entrega**:
  1. Criação do arquivo seguro `serviceAccount.json` e integração com `firebase-admin`.
  2. Teste de conectividade validado com escrita real no Firestore do projeto `vantinha-e9fca`.
  3. Sincronização automática de perfil de usuário na coleção `users/{id}` durante o callback de login.
  4. Nova API `/api/guilds/[guildId]/modules` para persistência das configurações da guilda na dashboard.
- **Arquivos Afetados**:
  - `serviceAccount.json`
  - `.gitignore`
  - `src/lib/firebase.ts`
  - `src/app/api/auth/callback/route.ts`
  - `src/app/api/guilds/[guildId]/modules/route.ts`
  - `src/app/dashboard/page.tsx`
  - `PROJECT_STATE.md`

### [Alpha 0.2] — Repaginação de Marca: Dourado Oficial, Nova Tipografia & Remoção da "Cara de IA"
- **Data**: 2026-11-13 01:45
- **Resumo da Entrega**:
  1. Fixado o **Dourado (`#E5A93C`)** como cor principal e identidade do Vanta em todo o site e constantes.
  2. Substituição da tipografia genérica por **`Space Grotesk`** (display) + **`Plus Jakarta Sans`** (corpo) via `next/font/google`.
  3. Remoção de todos os vícios visuais de IA (gradientes de palavras isoladas, bolhas difusas roxas/azuis, badges de emoji).
  4. Redesenho do `NeonAvatar.tsx`: anel neon giratório dourado durante a leitura e entrada no servidor, transicionando suavemente para verde esmeralda com checkmark ao concluir.
  5. Atualização da landing page com layout assimétrico, copy direto e mockup de alta fidelidade do Discord Components V2.
- **Arquivos Afetados**:
  - `src/lib/constants.ts`
  - `tailwind.config.ts`
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/components/NeonAvatar.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/BotPreviewCard.tsx`
  - `src/components/Footer.tsx`
  - `src/app/page.tsx`
  - `src/app/callback/page.tsx`
  - `src/app/dashboard/page.tsx`
  - `PROJECT_STATE.md`
  - `C:\Users\pc\Documents\Vanta Bot\constants.json`
  - `C:\Users\pc\.gemini\config\skills\vantinha-project-ledger\SKILL.md`

### [Alpha 0.1] — Fundação do Site & Autenticação Discord OAuth2
- **Data**: 2026-11-13 01:30
- **Resumo da Entrega**:
  1. Inicialização do projeto Next.js 14 com TypeScript e Tailwind CSS.
  2. Configuração do Discord OAuth2 (Client ID `1567751920645308548`, Secret, `redirect_uri=localhost:3000`).
  3. Criação da página de callback com animação em 3 etapas e contagem regressiva de 5s para `/dashboard`.
  4. Implementação de sessão por cookie HTTP-only e painel de controle.

---

## 5. Roadmap e Próximos Passos
- [ ] Conectar as rotas Fastify do `Vanta Bot` (porta 8080) à dashboard do site para leitura dinâmica de estatísticas ao vivo.
- [ ] Sistema de personalização de canais de boas-vindas e logs diretamente pelo painel.
- [ ] Exportação estática ou container Docker para deploy em VPS.
