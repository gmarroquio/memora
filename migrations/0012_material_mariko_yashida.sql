ALTER TABLE `users` RENAME COLUMN "photo_limit" TO "album_limit";--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` integer PRIMARY KEY NOT NULL,
	`price_id` text,
	`status` text DEFAULT 'inactive',
	`buy_date` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`activation_date` text DEFAULT (CURRENT_TIMESTAMP),
	`expire_at` text DEFAULT (CURRENT_TIMESTAMP),
	`album_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "album_limit" TO "album_limit" integer DEFAULT 2;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `subscription`;--> statement-breakpoint
ALTER TABLE `albums` ADD `photo_limit` integer DEFAULT 10;