import { integer, text, boolean, pgTable, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  themeId: text("theme_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  logo: text("logo").notNull(), // Base64 encoded
  color: text("color").notNull(), // Hex
});

export const pubs = pgTable("pubs", {
  id: serial("id").primaryKey(),
  pubId: text("pub_id").notNull().unique(),
  pubKey: text("pub_key").notNull().unique(),
  occupancy: integer("occupancy").notNull(),
  capacity: integer("capacity").notNull(),
  queueStatus: integer("queue_status").notNull(),
  isActive: boolean("is_active").notNull(),
  themeId: text("theme_id")
    .notNull()
    .references(() => themes.themeId, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
});

// Relations
export const themesRelations = relations(themes, ({ many }) => ({
  pubs: many(pubs),
}));

export const pubsRelations = relations(pubs, ({ one }) => ({
  theme: one(themes, { fields: [pubs.themeId], references: [themes.themeId] }),
}));
