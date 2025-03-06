ALTER TABLE `medias` RENAME COLUMN "user_id" TO "owner_id";--> statement-breakpoint
ALTER TABLE `medias` ADD `uploader` text;--> statement-breakpoint
ALTER TABLE `medias` ALTER COLUMN "owner_id" TO "owner_id" integer NOT NULL REFERENCES users(id) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_id` text;