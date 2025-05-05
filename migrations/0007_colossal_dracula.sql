ALTER TABLE "album_codes" ADD COLUMN "expires_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "expires_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "album_codes" DROP COLUMN "expire_at";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "expire_at";