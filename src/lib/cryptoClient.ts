import crypto from "node:crypto";

const API_URL = process.env.BOT_API_URL || "http://127.0.0.1:8080";
const API_SECRET = process.env.BOT_API_SECRET_KEY || "vanta_secret_token_dev";
const ENCRYPTION_KEY = process.env.BOT_API_ENCRYPTION_KEY || "vanta_aes256_super_secret_cipher_key_2026";

export interface EncryptedEnvelope {
  iv: string;      // 12 bytes hex
  authTag: string; // 16 bytes hex
  data: string;    // Dados cifrados hex
}

function getCipherKey(): Buffer {
  return crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
}

/**
 * Criptografa dados em um envelope AES-256-GCM inviolável
 */
export function encryptPayload<T = unknown>(data: T): EncryptedEnvelope {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getCipherKey(), iv);
  const jsonStr = JSON.stringify(data);
  let encrypted = cipher.update(jsonStr, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    data: encrypted
  };
}

/**
 * Descriptografa um envelope autenticado enviado pelo bot
 */
export function decryptPayload<T = unknown>(envelope: EncryptedEnvelope): T {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    getCipherKey(),
    Buffer.from(envelope.iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(envelope.authTag, "hex"));
  let decrypted = decipher.update(envelope.data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted) as T;
}

/**
 * Utilitário central para executar chamadas autenticadas e cifradas para o Bot (Fastify Gateway)
 */
export async function sendSecureBotRequest<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: unknown
): Promise<T> {
  const headers: Record<string, string> = {
    "x-api-key": API_SECRET,
    "Content-Type": "application/json"
  };

  const options: RequestInit = { method, headers };

  if (body) {
    options.body = JSON.stringify(encryptPayload(body));
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || `Erro HTTP ${response.status}`);
  }

  // Se a resposta vier cifrada pelo bot, descriptografa automaticamente
  if (json.iv && json.authTag && json.data) {
    return decryptPayload<T>(json);
  }

  return json as T;
}
