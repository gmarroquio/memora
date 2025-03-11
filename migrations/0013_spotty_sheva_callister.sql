DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "album_limit" TO "album_limit" integer NOT NULL DEFAULT 2;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);