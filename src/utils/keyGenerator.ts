export const LOGO_URL = '/assets/aistudio/file_00000000bc7c8211adcf0a804031e62b_46000da4.png';
export const OWNER_PHOTO_URL = '/assets/aistudio/banner_aa4162f0.png';
export const OWNER_AUDIO_URL = '/assets/owner-theme.wav';

const STORAGE_KEY = 'vex_lora_generated_keys_v1';
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const KEY_FORMAT_REGEX = /^VEX-SHAYAN-[A-Z0-9]{4}-([1-9]\d*)$/;

export function isValidVexKey(key: string): boolean {
  return KEY_FORMAT_REGEX.test(key);
}

export function getStoredKeys(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set<string>();
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set<string>(parsed.filter((item): item is string => typeof item === 'string'));
    }
    return new Set<string>();
  } catch {
    return new Set<string>();
  }
}

function saveStoredKeys(keys: Set<string>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(keys)));
  } catch {
    // Handle storage quota or private-browsing restrictions gracefully
  }
}

function generateFourCharCode(): string {
  const chars: string[] = [];
  if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.getRandomValues === 'function') {
    const randomBytes = new Uint32Array(4);
    window.crypto.getRandomValues(randomBytes);
    for (let i = 0; i < 4; i++) {
      chars.push(ALPHANUMERIC[randomBytes[i] % ALPHANUMERIC.length]);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      chars.push(ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)]);
    }
  }
  return chars.join('');
}

export function generateUniqueKey(durationDays: number): string {
  if (!Number.isInteger(durationDays) || durationDays < 1) {
    throw new Error('Duration must be a positive whole number of days.');
  }

  const existingKeys = getStoredKeys();
  let candidate = '';
  let attempts = 0;
  const maxAttempts = 10000;

  do {
    const code = generateFourCharCode();
    candidate = `VEX-SHAYAN-${code}-${durationDays}`;
    attempts++;
  } while ((existingKeys.has(candidate) || !isValidVexKey(candidate)) && attempts < maxAttempts);

  if (existingKeys.has(candidate) || !isValidVexKey(candidate)) {
    throw new Error('Unable to generate a unique valid activation key.');
  }

  existingKeys.add(candidate);
  saveStoredKeys(existingKeys);
  return candidate;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall back to execCommand below
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
