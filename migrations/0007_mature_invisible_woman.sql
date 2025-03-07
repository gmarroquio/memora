PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone_number` text,
	`stripe_id` text,
	`photo_limit` integer DEFAULT 10,
	`subscription` text DEFAULT 'free'
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "phone_number", "stripe_id", "photo_limit", "subscription") SELECT "id", "name", "email", "phone_number", "stripe_id", "photo_limit", "subscription" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);