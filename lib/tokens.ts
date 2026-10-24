import { createHash, randomInt } from "node:crypto"

// Short, readable ids: 6 chars from an alphabet without look-alikes (0/o, 1/l/i).
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789"
export const TOKEN_LENGTH = 6
export const TOKEN_PATTERN = /^[a-z0-9]{6}$/

export function generateToken() {
  let out = ""
  for (let i = 0; i < TOKEN_LENGTH; i++)
    out += ALPHABET[randomInt(ALPHABET.length)]
  return out
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex")
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "treaty"
  return createHash("sha256")
    .update(salt + ip)
    .digest("hex")
    .slice(0, 32)
}
