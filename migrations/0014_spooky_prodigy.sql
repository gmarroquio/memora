PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_subscriptions` (
	`id` integer PRIMARY KEY NOT NULL,
	`price_id` text,
	`receipt_url` text,
	`status` text DEFAULT 'inactive',
	`buy_date` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`activation_date` text DEFAULT (CURRENT_TIMESTAMP),
	`photo_limit` integer DEFAULT 500,
	`expiration_time` integer DEFAULT 6,
	`expire_at` text DEFAULT (CURRENT_TIMESTAMP),
	`album_id` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_subscriptions`("id", "price_id", "receipt_url", "status", "buy_date", "activation_date", "photo_limit", "expiration_time", "expire_at", "album_id", "user_id") SELECT "id", "price_id", "receipt_url", "status", "buy_date", "activation_date", "photo_limit", "expiration_time", "expire_at", "album_id", "user_id" FROM `subscriptions`;--> statement-breakpoint
DROP TABLE `subscriptions`;--> statement-breakpoint
ALTER TABLE `__new_subscriptions` RENAME TO `subscriptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "album_limit" TO "album_limit" integer NOT NULL DEFAULT 0;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);