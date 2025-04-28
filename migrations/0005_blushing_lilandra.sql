ALTER TABLE "albums" RENAME COLUMN "photo_limit" TO "user_limit";--> statement-breakpoint
ALTER TABLE "medias" ALTER COLUMN "uploader" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "start_date" timestamp;--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "vintage" boolean;--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "reveal_time" text;--> statement-breakpoint
ALTER TABLE "albums" ADD COLUMN "open_gallery" boolean;--> statement-breakpoint
ALTER TABLE "anon_users" ADD COLUMN "album_id" text;--> statement-breakpoint
ALTER TABLE "anon_users" ADD CONSTRAINT "anon_users_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medias" ADD CONSTRAINT "medias_uploader_anon_users_id_fk" FOREIGN KEY ("uploader") REFERENCES "public"."anon_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "album_limit";