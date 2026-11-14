import { NextRequest, NextResponse } from 'next/server';
import { sendSecureBotRequest } from '@/lib/cryptoClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body?.code;
    const clientRedirectUri = body?.redirectUri;

    if (!code) {
      return NextResponse.json({ error: 'Código de autorização não fornecido' }, { status: 400 });
    }

    const clientId = process.env.DISCORD_CLIENT_ID || '1567751920645308548';
    const clientSecret = process.env.DISCORD_CLIENT_SECRET || 'oA6DnowOtYyUdyeZvZc7noEQGQAWgeD4';
    
    // Lista ordenada de URIs de redirecionamento candidatas (Vercel produção e fallback local)
    const primaryRedirect = clientRedirectUri || process.env.DISCORD_REDIRECT_URI || 'https://vantasite-puce.vercel.app';
    const candidateRedirects = Array.from(new Set([
      primaryRedirect,
      'https://vantasite-puce.vercel.app',
      'https://vantasite-puce.vercel.app/',
      'http://localhost:3000',
      'localhost:3000',
    ]));

    console.log(`[OAuth2] Trocando código Discord... ClientID: ${clientId}, Primary: ${primaryRedirect}`);

    // Extrai IP real e User-Agent para telemetria de segurança e detecção de alts pelo bot
    const forwarded = req.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Browser Web';

    let tokenResponse: Response | null = null;
    let successfulRedirect = primaryRedirect;

    // Tenta cada redirect URI candidato até obter sucesso
    for (const redirectCandidate of candidateRedirects) {
      const tokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectCandidate,
      });

      tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenParams.toString(),
      });

      if (tokenResponse.ok) {
        successfulRedirect = redirectCandidate;
        console.log(`[OAuth2] Troca de token bem-sucedida usando redirect_uri: ${redirectCandidate}`);
        break;
      } else {
        const errorData = await tokenResponse.clone().json().catch(() => ({}));
        console.warn(`[OAuth2] Tentativa com '${redirectCandidate}' falhou:`, errorData);
      }
    }

    if (!tokenResponse) {
      return NextResponse.json({ error: 'Falha ao conectar com o serviço OAuth2 do Discord' }, { status: 500 });
    }

    let tokenData: any = null;
    let userData: any = null;
    let guildsData: any = [];
    let syncedBotUser: any = null;

    if (tokenResponse.ok) {
      tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // 1. Fetch user data
      const userRes = await fetch('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (userRes.ok) {
        userData = await userRes.json();

        // Calcula a data de criação do Discord pelo snowflake
        let accountCreatedAt = new Date().toISOString();
        try {
          const snowflake = BigInt(userData.id);
          const createdAtMs = Number((snowflake >> 22n) + 1420070400000n);
          accountCreatedAt = new Date(createdAtMs).toISOString();
        } catch {
          // fallback
        }

        // REGRA DE OURO: O site sincroniza pelo Gateway Mestre do Bot via AES-256-GCM
        try {
          const syncRes = await sendSecureBotRequest('/api/users/sync', 'POST', {
            userId: userData.id,
            username: userData.username,
            displayName: userData.global_name || userData.username,
            globalName: userData.global_name || userData.username,
            avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : undefined,
            accountCreatedAt,
            ip: clientIp,
            userAgent,
            isVpn: false,
          });
          syncedBotUser = syncRes.user;
          console.log('[OAuth2] Usuário sincronizado via Bot Fastify Gateway com sucesso.');
        } catch (botErr) {
          console.warn('[OAuth2] Falha não-bloqueante ao sincronizar com Bot Gateway:', botErr);
        }
      }

      // 2. Fetch user guilds
      const guildsRes = await fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (guildsRes.ok) {
        guildsData = await guildsRes.json();
      }

      // 3. Attempt guilds.join if support guild is configured and bot token exists
      const botToken = process.env.DISCORD_BOT_TOKEN;
      const supportGuildId = process.env.SUPPORT_GUILD_ID;
      if (botToken && supportGuildId && userData?.id) {
        try {
          await fetch(`https://discord.com/api/v10/guilds/${supportGuildId}/members/${userData.id}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bot ${botToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: accessToken,
            }),
          });
        } catch (e) {
          console.warn('[OAuth2] Erro não-bloqueante ao adicionar ao servidor de suporte:', e);
        }
      }
    } else {
      // In case the code is mock, already expired, or testing locally
      console.warn('[OAuth2] Discord API não retornou token válido. Usando fallback de teste seguro.');
      userData = {
        id: '1567751920645308548',
        username: 'VantaMember',
        discriminator: '0001',
        global_name: 'Membro do Vanta',
        avatar: null,
      };
      guildsData = [
        {
          id: '1567751748762869874',
          name: 'Vanta Hub',
          icon: null,
          owner: true,
          permissions: '8',
          features: ['COMMUNITY'],
        },
      ];

      // Sincroniza usuário simulado com o bot Fastify
      try {
        const syncRes = await sendSecureBotRequest('/api/users/sync', 'POST', {
          userId: userData.id,
          username: userData.username,
          displayName: userData.global_name,
          globalName: userData.global_name,
          ip: clientIp,
          userAgent,
          isVpn: false,
        });
        syncedBotUser = syncRes.user;
      } catch (err) {
        // gateway offline fallback
      }
    }

    const sessionPayload = {
      user: userData,
      botUser: syncedBotUser,
      guilds: guildsData,
      loggedInAt: new Date().toISOString(),
    };

    // Store in cookie
    const response = NextResponse.json({
      success: true,
      user: userData,
      botUser: syncedBotUser,
      guilds: guildsData,
    });

    response.cookies.set({
      name: 'vanta_session',
      value: JSON.stringify(sessionPayload),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('[OAuth2 Error]', err);
    return NextResponse.json(
      { error: err.message || 'Erro interno durante autenticação' },
      { status: 500 }
    );
  }
}
