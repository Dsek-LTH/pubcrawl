import { integer, text, boolean, pgTable, serial } from "drizzle-orm/pg-core";

export const pubs = pgTable("pubs", {
  id: serial("id").primaryKey(),
  pubId: text("pub_id").notNull().unique(),
  pubKey: text("pub_key").notNull().unique(),
  occupancy: integer("occupancy").notNull(),
  capacity: integer("capacity").notNull(),
  queueStatus: integer("queue_status").notNull(),
  isActive: boolean("is_active").notNull(),
  displayName: text("display_name").notNull(),
  logo: text("logo").notNull(), // Base64 encoded
  color: text("color").notNull(), // Hex
});
