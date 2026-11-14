import { getFirestoreDb } from '@/lib/firebase';
import type { SystemStatusDocument } from '@/types/status';

/**
 * Lê o snapshot oficial de telemetria do Vantinha salvo em system/bot_status no Firestore.
 */
export async function getBotStatus(): Promise<SystemStatusDocument | null> {
  try {
    const db = getFirestoreDb();
    if (!db) {
      console.warn('[Status] Conexão com Firestore não disponível.');
      return null;
    }

    const docSnap = await db.collection('system').doc('bot_status').get();

    if (!docSnap.exists) {
      console.warn('[Status] Documento system/bot_status ainda não existe no Firestore.');
      return null;
    }

    const data = docSnap.data() as SystemStatusDocument;
    return data;
  } catch (error) {
    console.error('[Status] Erro ao buscar telemetria do Firestore:', error);
    return null;
  }
}
