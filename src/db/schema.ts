import { sql } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number"),
  stripeId: text("stripe_id"),
  albumLimit: integer("album_limit").default(0).notNull(),
});

export const anonUsersTable = pgTable("anon_users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const albumsTable = pgTable("albums", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  coverUrl: text("cover_url"),
  photoLimit: integer("photo_limit").default(10),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const mediasTable = pgTable("medias", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  status: text("status", { enum: ["active", "deleted"] }).default("active"),
  uploader: text("uploader"),
  comment: text("comment"),
  utId: text("ut_id").notNull().default("empty"),
  albumId: text("album_id")
    .notNull()
    .references(() => albumsTable.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const previewsTable = pgTable("previews", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  utId: text("ut_id").notNull().default("empty"),
  mediaId: integer("media_id")
    .notNull()
    .references(() => mediasTable.id, { onDelete: "cascade" }),
});

export const codesTable = pgTable("album_codes", {
  id: integer("id").primaryKey(),
  code: text("code").notNull(),
  expireAt: text("expire_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  albumId: text("album_id")
    .notNull()
    .references(() => albumsTable.id, { onDelete: "cascade" }),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: integer("id").primaryKey(),
  priceId: text("price_id"),
  receiptUrl: text("receipt_url"),
  name: text("name").default("Basic"),
  status: text("status", {
    enum: ["active", "inactive", "expired", "deleted"],
  }).default("inactive"),
  buyDate: text("buy_date")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  activationDate: text("activation_date"),
  photoLimit: integer("photo_limit").default(500),
  expirationTime: integer("expiration_time").default(6),
  expireAt: text("expire_at"),
  albumId: text("album_id").references(() => albumsTable.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertAlbum = typeof albumsTable.$inferInsert;
export type SelectAlbum = typeof albumsTable.$inferSelect;

export type InsertMedia = typeof mediasTable.$inferInsert;
export type SelectMedia = typeof mediasTable.$inferSelect;

export type InsertPreview = typeof previewsTable.$inferInsert;
export type SelectPreview = typeof previewsTable.$inferSelect;

export type InsertCode = typeof codesTable.$inferInsert;
export type SelectCode = typeof codesTable.$inferSelect;
