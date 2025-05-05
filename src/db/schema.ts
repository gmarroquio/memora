import {
  integer,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  phoneNumber: text("phone_number"),
  stripeId: text("stripe_id"),
});

export const anonUsersTable = pgTable("anon_users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  albumId: text("album_id").references(() => albumsTable.id, {
    onDelete: "cascade",
  }),
});

export const albumsTable = pgTable("albums", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  userLimit: integer("user_limit").notNull().default(10),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
  vintage: boolean("vintage"),
  revealTime: text("reveal_time", { enum: ["now", "after", "12h", "24h"] }),
  openGallery: boolean("open_gallery"),
  coverUrl: text("cover_url"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const mediasTable = pgTable("medias", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  status: text("status", { enum: ["active", "deleted"] }).default("active"),
  comment: text("comment"),
  utId: text("ut_id").notNull().default("empty"),
  uploader: text("uploader")
    .notNull()
    .references(() => anonUsersTable.id, { onDelete: "cascade" }),
  albumId: text("album_id")
    .notNull()
    .references(() => albumsTable.id, { onDelete: "cascade" }),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const previewsTable = pgTable("previews", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  utId: text("ut_id").notNull().default("empty"),
  mediaId: integer("media_id")
    .notNull()
    .references(() => mediasTable.id, { onDelete: "cascade" }),
});

export const codesTable = pgTable("album_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  albumId: text("album_id")
    .notNull()
    .references(() => albumsTable.id, { onDelete: "cascade" }),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  priceId: text("price_id"),
  receiptUrl: text("receipt_url"),
  name: text("name").default("Basic"),
  status: text("status", {
    enum: ["active", "inactive", "expired", "deleted"],
  }).default("inactive"),
  buyDate: timestamp("buy_date", { withTimezone: true }).defaultNow().notNull(),
  activationDate: timestamp("activation_date", { withTimezone: true }),
  photoLimit: integer("photo_limit").default(500),
  expirationTime: integer("expiration_time").default(6),
  expiresAt: timestamp("expires_at", { withTimezone: true }).defaultNow(),
  albumId: text("album_id").references(() => albumsTable.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const blogPostTable = pgTable("blog_posts", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  postDate: timestamp("postDate", { withTimezone: true })
    .notNull()
    .defaultNow(),
  cover: varchar("cover").notNull(),
  keywords: varchar("keywords").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description").notNull(),
  text: text("text").notNull(),
});

export const blogImagesTable = pgTable("blog_images", {
  id: varchar("id").primaryKey(),
  url: varchar("url").notNull(),
  postId: varchar("post_id")
    .notNull()
    .references(() => blogPostTable.id, { onDelete: "cascade" }),
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

export type InsertSubscription = typeof subscriptionsTable.$inferInsert;
export type SelectSubscription = typeof subscriptionsTable.$inferSelect;
