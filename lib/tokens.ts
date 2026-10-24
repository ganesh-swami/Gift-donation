import { createHash, randomBytes } from "node:crypto"

export function generateToken() {
  return randomBytes(32).toString("base64url")
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex")
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "treaty"
  return createHash("sha256").update(salt + ip).digest("hex").slice(0, 32)
}
