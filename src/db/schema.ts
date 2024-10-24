import {
  pgTable,
  pgEnum,
  serial,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "piad",
  "void",
  "uncollectible",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  status: statusEnum("status").notNull(),
});
