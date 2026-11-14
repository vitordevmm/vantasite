<div align="center">

  **🌐 Idiomas / Languages:**  
  [🇧🇷 Português (Brasil)](README.md) &nbsp;•&nbsp; [🇺🇸 English](README.en.md) &nbsp;•&nbsp; [🇪🇸 Español](README.es.md)

  <br/><br/>

  <img src="public/logo.png" alt="Vanta Logo" width="90" height="75" />

  # 🌌 VANTA SITE
  ### Portal Web Oficial & Panel de Seguridad • Vantinha

  <p align="center">
    El portal oficial del ecosistema <strong>Vanta</strong> y del asistente <strong>Vantinha</strong> (<a href="https://discord.com"><code>Vantinha#0419</code></a>).<br/>
    Ingeniería de alto rendimiento, estética minimalista e integración directa con el clúster de seguridad de la comunidad.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Fastify_Gateway-Clúster_Dedicado-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
    <img src="https://img.shields.io/badge/Cifrado-AES--256--GCM-E5A93C?style=for-the-badge" alt="AES-256-GCM" />
    <img src="https://img.shields.io/badge/Discord-Components_V2-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Components V2" />
  </p>

</div>

---

## 🏛️ Descripción General de la Arquitectura

El **Vanta Site** opera como la interfaz web principal de la comunidad **Vanta Hub**, diseñada bajo el principio de **Master Data Gateway**:

```
                       ┌────────────────────────────────────────┐
                       │          NAVEGADOR / USUARIO           │
                       │    (Landing Page, Panel & Verify)      │
                       └───────────────────┬────────────────────┘
                                           │
                           Túnel Cifrado   │ AES-256-GCM + API Key
                                           ▼
                       ┌────────────────────────────────────────┐
                       │        BOT MASTER DATA GATEWAY         │
                       │          (Fastify API Gateway)         │
                       └───────────┬────────────────┬───────────┘
                                   │                │
                      Sincronización│                │ WebSocket Nativo
                      de Almacenaje │                │ Components V2
                                   ▼                ▼
                       ┌────────────────┐    ┌──────────────────┐
                       │ Base de Datos  │    │ Discord Gateway  │
                       │ Clúster Cloud  │    │ (Roles, Canales) │
                       └────────────────┘    └──────────────────┘
```

> 🛡️ **Principio de Confidencialidad e Integridad**: El sitio web nunca accede a la base de datos de manera directa. El bot de Discord centraliza el 100% de los cálculos de seguridad, detección de cuentas secundarias, auditoría de conexiones y gestión de roles.

---

## ⚡ Tecnologías y Ecosistema

### Frontend & Panel Web
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router con renderizado híbrido estático/dinámico).
* **Lenguaje:** TypeScript con tipado estricto de contratos de datos.
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) basado en los design tokens oficiales de Vanta.
* **Tipografía:** `Space Grotesk` (encabezados arquitectónicos) y `Plus Jakarta Sans` (lectura refinada).

### Backend & Servicios del Clúster
* **Framework del Bot:** `Constatic Framework` en ESM puro.
* **API Gateway:** `Fastify` con CORS habilitado y validación por `x-api-key`.
* **Interfaz en Discord:** `Discord Components V2` con contenedores modernos, secciones dinámicas y flags nativas.
* **Túnel Criptográfico:** Cifrado autenticado `AES-256-GCM` con IV aleatorio de 12 bytes, tag de 16 bytes y derivación SHA-256.
* **Base de Datos Cloud:** Clúster Google Cloud Firestore.

---

## 🛡️ Capacidades Centrales de Seguridad

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ 1. DETECCIÓN GLOBAL DE ALTS (CUENTAS SECUNDARIAS)                      │
 │    Cruce de historial de IPs y huellas digitales para identificar      │
 │    cuentas duplicadas, mitigar incursiones y frenar evasión de sanciones│
 ├────────────────────────────────────────────────────────────────────────┤
 │ 2. AUDITORÍA DE RED & BLOQUEO DE PROXY/VPN                             │
 │    Análisis de integridad de conexión antes de asignar roles,          │
 │    bloqueando orígenes sospechosos o redes no autorizadas.             │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 3. PORTAL OFICIAL DE VERIFICACIÓN CON TOKEN EFÍMERO                    │
 │    Sesiones únicas de 15 minutos generadas directamente en el chat,    │
 │    con expiración inmediata tras la validación.                        │
 ├────────────────────────────────────────────────────────────────────────┤
 │ 4. COMANDOS NATIVOS INTERACTIVOS                                       │
 │    /help: Central de orientación, estado del sistema y soporte         │
 │    /ping: Medición en tiempo real del WebSocket y respuesta del bot    │
 │    /counter: Contador reactivo con persistencia y sin parpadeo         │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores Oficial (Design Tokens)

El ecosistema Vanta adopta una estética sobria, austera y elegante en Dorado y Vantablack:

| Token | Hex | Aplicación en el Sitio |
| :--- | :--- | :--- |
| `vantaGold` | `#E5A93C` | **Dorado Oficial Vanta** (Identidad, botones principales, destaques) |
| `vanta` | `#0a0a0c` | Fondo principal (*Vantablack* aesthetic) |
| `vantaDark` | `#121217` | Fondo de tarjetas, modales, barras laterales y paneles |
| `vantaLight` | `#1c1c24` | Bordes sutiles, divisores y capas secundarias |
| `success` | `#22c55e` | Verde de verificación y estado operacional |
| `danger` | `#ED4245` | Alertas de seguridad, expulsiones y bloqueo de conexiones |

---

## 🌐 Ecosistema Oficial y Acceso

Vantinha es un sistema propietario y cerrado, operado exclusivamente para la **Comunidad Vanta**:

* **Portal Oficial en Producción**: [https://vantasite-puce.vercel.app](https://vantasite-puce.vercel.app)
* **Añadir el Bot**: [Invitar a Vantinha a tu Servidor de Discord](https://discord.com/oauth2/authorize?client_id=1567751920645308548&response_type=code&redirect_uri=https%3A%2F%2Fvantasite-puce.vercel.app&scope=identify+guilds+guilds.join)
* **Comunidad Oficial**: [Unirse a Vanta Hub en Discord](https://discord.gg/vanta)
* **Panel Web**: Autenticación segura mediante Discord OAuth2 para miembros autorizados.

---

## 🔒 Gobernanza y Ledger Continuo

Este proyecto sigue el estricto protocolo de **Vanta Ledger**, registrando cada versión, mejora de arquitectura y diseño en el archivo [PROJECT_STATE.md](./PROJECT_STATE.md).

---

## ⚖️ Licencia y Política Anti-Plagio

Este proyecto está protegido bajo la **Proprietary Source Code License (All Rights Reserved)**.

> 🛑 **PROHIBICIÓN EXPRESA DE PLAGIO Y COPIA**:  
> Queda terminantemente prohibida la copia, clonación, redistribución, republicación, venta o apropiación indebida de este código fuente, identidad visual, diseño o componentes, total o parcialmente, en cualquier plataforma o servicio competidor.  
> Todos los derechos están reservados a la **Comunidad Vanta** y al autor **Vítor Dev** ([vitordevmm](https://github.com/vitordevmm)). Las infracciones serán objeto de acciones legales y solicitudes inmediatas de DMCA Takedown.

Para más información, consulta el archivo [LICENSE](./LICENSE).

---

<div align="center">
  <p><strong>Comunidad Vanta</strong> • <em>Dorado & Vantablack</em></p>
  <p>© 2026 Vanta Hub. Todos los derechos reservados.</p>
</div>
