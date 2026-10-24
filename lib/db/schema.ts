import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const treaties = sqliteTable("treaties", {
  id: text("id").primaryKey(),
  occasion: text("occasion").notNull(),
  occasionLabel: text("occasion_label"),
  currency: text("currency").notNull().default("USD"),
  proposedAmount: integer("proposed_amount").notNull(), // cents
  agreedAmount: integer("agreed_amount"), // cents
  message: text("message"),
  status: text("status").notNull().default("pending"), // pending|accepted|declined|completed
  createdAt: integer("created_at").notNull(),
  respondedAt: integer("responded_at"),
  completedAt: integer("completed_at"),
})

export const participants = sqliteTable("participants", {
  id: text("id").primaryKey(),
  treatyId: text("treaty_id")
    .notNull()
    .references(() => treaties.id),
  role: text("role").notNull(), // creator|recipient
  name: text("name").notNull(),
  email: text("email").notNull(),
  tokenHash: text("token_hash").notNull().unique(),
  // the charity this person picked for the OTHER person to donate to
  charityId: text("charity_id"),
  donatedAt: integer("donated_at"),
  firstViewedAt: integer("first_viewed_at"),
})

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  treatyId: text("treaty_id"),
  name: text("name").notNull(),
  role: text("role"),
  ipHash: text("ip_hash"),
  meta: text("meta"),
  createdAt: integer("created_at").notNull(),
})
