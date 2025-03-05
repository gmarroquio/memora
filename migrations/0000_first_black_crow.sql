CREATE TABLE `albums` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`cover_url` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `album_codes` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`expire_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`album_id` integer NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `medias` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`status` text DEFAULT 'active',
	`album_id` integer NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `previews` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`media_id` integer NOT NULL,
	FOREIGN KEY (`media_id`) REFERENCES `medias`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone_number` text,
	`photo_limit` integer DEFAULT 10,
	`subscription` text DEFAULT 'free'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);