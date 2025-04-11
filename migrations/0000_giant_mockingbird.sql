CREATE TABLE "albums" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"cover_url" text,
	"photo_limit" integer DEFAULT 10,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "anon_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "album_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"expire_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"album_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medias" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"status" text DEFAULT 'active',
	"uploader" text,
	"comment" text,
	"ut_id" text DEFAULT 'empty' NOT NULL,
	"album_id" text NOT NULL,
	"owner_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "previews" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"ut_id" text DEFAULT 'empty' NOT NULL,
	"media_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"price_id" text,
	"receipt_url" text,
	"name" text DEFAULT 'Basic',
	"status" text DEFAULT 'inactive',
	"buy_date" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"activation_date" text,
	"photo_limit" integer DEFAULT 500,
	"expiration_time" integer DEFAULT 6,
	"expire_at" text,
	"album_id" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"stripe_id" text,
	"album_limit" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_codes" ADD CONSTRAINT "album_codes_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medias" ADD CONSTRAINT "medias_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medias" ADD CONSTRAINT "medias_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "previews" ADD CONSTRAINT "previews_media_id_medias_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."medias"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;