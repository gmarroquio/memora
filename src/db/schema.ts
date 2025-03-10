import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number"),
  stripeId: text("stripe_id"),
  photoLimit: integer("photo_limit").default(10),
  subscription: text("subscription", {
    enum: ["free", "tier1", "tier2", "tier3"],
  }).default("free"),
});

export const anonUsersTable = sqliteTable("anon_users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
});

export const albumsTable = sqliteTable("albums", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  coverUrl: text("cover_url"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const mediasTable = sqliteTable("medias", {
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

export const previewsTable = sqliteTable("previews", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  utId: text("ut_id").notNull().default("empty"),
  mediaId: integer("media_id")
    .notNull()
    .references(() => mediasTable.id, { onDelete: "cascade" }),
});

export const codesTable = sqliteTable("album_codes", {
  id: integer("id").primaryKey(),
  code: text("code").notNull(),
  expireAt: text("expire_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  albumId: text("album_id")
    .notNull()
    .references(() => albumsTable.id, { onDelete: "cascade" }),
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
