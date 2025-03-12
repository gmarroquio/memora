DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `subscriptions` ALTER COLUMN "activation_date" TO "activation_date" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `subscriptions` ALTER COLUMN "expire_at" TO "expire_at" text;