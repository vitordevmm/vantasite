import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore, FieldValue } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';
import { DiscordUser } from './discord';

let firebaseApp: App | null = null;
let firestoreDb: Firestore | null = null;

export function getFirebaseApp(): App | null {
  if (firebaseApp) return firebaseApp;

  if (getApps().length > 0) {
    firebaseApp = getApps()[0];
    return firebaseApp;
  }

  const candidatePaths = [
    process.env.FIREBASE_PATH,
    './serviceAccount.json',
    './firebase.json',
    path.join(process.cwd(), 'serviceAccount.json'),
    path.join(process.cwd(), 'firebase.json'),
  ].filter(Boolean) as string[];

  const resolvedPath = candidatePaths.find((p) => fs.existsSync(p));

  if (!resolvedPath) {
    console.warn('[Firebase] Arquivo de credenciais serviceAccount.json não encontrado.');
    return null;
  }

  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    const credentials = JSON.parse(raw);

    if (credentials.private_key && credentials.private_key.includes('BEGIN PRIVATE KEY')) {
      firebaseApp = initializeApp({
        credential: cert(credentials),
      });
      console.log(`[Firebase] Conectado com sucesso ao Firestore (${credentials.project_id})`);
      return firebaseApp;
    } else {
      console.warn('[Firebase] Chave privada inválida no arquivo de credenciais.');
      return null;
    }
  } catch (err) {
    console.error('[Firebase] Erro ao carregar credenciais:', err);
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  if (firestoreDb) return firestoreDb;
  const app = getFirebaseApp();
  if (!app) return null;
  firestoreDb = getFirestore(app);
  return firestoreDb;
}

/**
 * Salva ou atualiza um usuário autenticado via Discord no Firestore
 */
export async function saveUserToDatabase(user: DiscordUser) {
  try {
    const db = getFirestoreDb();
    if (!db) return null;

    const userRef = db.collection('users').doc(user.id);
    const payload = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      global_name: user.global_name || null,
      avatar: user.avatar,
      lastLoginAt: new Date().toISOString(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await userRef.set(payload, { merge: true });
    return payload;
  } catch (error) {
    console.error(`[Firebase] Erro ao salvar usuário ${user.id}:`, error);
    return null;
  }
}

/**
 * Consulta as configurações de uma guilda no Firestore
 */
export async function getGuildConfigFromDb(guildId: string) {
  try {
    const db = getFirestoreDb();
    if (!db) return null;

    const doc = await db.collection('guilds').doc(guildId).get();
    if (!doc.exists) return null;
    return doc.data();
  } catch (error) {
    console.error(`[Firebase] Erro ao consultar guilda ${guildId}:`, error);
    return null;
  }
}

/**
 * Atualiza um módulo específico da guilda
 */
export async function updateGuildModuleInDb(guildId: string, moduleName: string, enabled: boolean) {
  try {
    const db = getFirestoreDb();
    if (!db) return false;

    await db.collection('guilds').doc(guildId).set(
      {
        modules: {
          [moduleName]: enabled,
        },
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error(`[Firebase] Erro ao atualizar módulo ${moduleName} da guilda ${guildId}:`, error);
    return false;
  }
}
