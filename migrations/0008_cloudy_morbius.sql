PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_albums` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`cover_url` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_albums`("id", "title", "cover_url", "user_id") SELECT "id", "title", "cover_url", "user_id" FROM `albums`;--> statement-breakpoint
DROP TABLE `albums`;--> statement-breakpoint
ALTER TABLE `__new_albums` RENAME TO `albums`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_medias` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`status` text DEFAULT 'active',
	`uploader` text,
	`comment` text,
	`album_id` text NOT NULL,
	`owner_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_medias`("id", "url", "status", "uploader", "comment", "album_id", "owner_id") SELECT "id", "url", "status", "uploader", "comment", "album_id", "owner_id" FROM `medias`;--> statement-breakpoint
DROP TABLE `medias`;--> statement-breakpoint
ALTER TABLE `__new_medias` RENAME TO `medias`;