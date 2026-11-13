export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  global_name?: string | null;
  avatar: string | null;
  banner?: string | null;
  accent_color?: number | null;
  email?: string;
  verified?: boolean;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export function getDiscordAvatarUrl(user: DiscordUser | null, size: number = 256): string {
  if (!user) return '/logo.png';
  if (user.avatar) {
    const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=${size}`;
  }
  const defaultIndex = (BigInt(user.id) >> 22n) % 6n;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

export function getDiscordGuildIconUrl(guild: DiscordGuild, size: number = 128): string | null {
  if (!guild.icon) return null;
  const format = guild.icon.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${format}?size=${size}`;
}

export function hasManageGuildPermission(permissions: string | number): boolean {
  try {
    const bitwise = BigInt(permissions);
    const ADMINISTRATOR = 0x8n;
    const MANAGE_GUILD = 0x20n;
    return (bitwise & ADMINISTRATOR) === ADMINISTRATOR || (bitwise & MANAGE_GUILD) === MANAGE_GUILD;
  } catch {
    return false;
  }
}
