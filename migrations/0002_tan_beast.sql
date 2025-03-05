PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_album_codes` (
	`id` integer PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`expire_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`album_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_album_codes`("id", "code", "expire_at", "album_id") SELECT "id", "code", "expire_at", "album_id" FROM `album_codes`;--> statement-breakpoint
DROP TABLE `album_codes`;--> statement-breakpoint
ALTER TABLE `__new_album_codes` RENAME TO `album_codes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_medias` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`status` text DEFAULT 'active',
	`album_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_medias`("id", "url", "status", "album_id") SELECT "id", "url", "status", "album_id" FROM `medias`;--> statement-breakpoint
DROP TABLE `medias`;--> statement-breakpoint
ALTER TABLE `__new_medias` RENAME TO `medias`;