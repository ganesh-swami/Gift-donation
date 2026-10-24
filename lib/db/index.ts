import "server-only"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

// Local: a SQLite file. Vercel: set TURSO_DATABASE_URL / TURSO_AUTH_TOKEN.
const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./data/treaty.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

const DDL = [
  `CREATE TABLE IF NOT EXISTS treaties (
    id TEXT PRIMARY KEY, occasion TEXT NOT NULL, occasion_label TEXT,
    currency TEXT NOT NULL DEFAULT 'USD', proposed_amount INTEGER NOT NULL,
    agreed_amount INTEGER, message TEXT, mode TEXT NOT NULL DEFAULT 'both', status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL, responded_at INTEGER, completed_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS participants (
    id TEXT PRIMARY KEY, treaty_id TEXT NOT NULL REFERENCES treaties(id),
    role TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL,
    token_hash TEXT NOT NULL UNIQUE, charity_id TEXT, donated_at INTEGER,
    first_viewed_at INTEGER)`,
  `CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY, treaty_id TEXT, name TEXT NOT NULL, role TEXT,
    ip_hash TEXT, meta TEXT, created_at INTEGER NOT NULL)`,
  `CREATE INDEX IF NOT EXISTS events_name_idx ON events(name)`,
  `CREATE INDEX IF NOT EXISTS events_ip_idx ON events(ip_hash, created_at)`,
]

let ready: Promise<unknown> | undefined

/** Creates tables on first use, so no separate migration step is needed. */
export function ensureSchema() {
  ready ??= (async () => {
    await client.batch(DDL, "write")
    // Databases created before the mode column existed.
    await client
      .execute(
        "ALTER TABLE treaties ADD COLUMN mode TEXT NOT NULL DEFAULT 'both'"
      )
      .catch(() => {})
  })()
  return ready
}
