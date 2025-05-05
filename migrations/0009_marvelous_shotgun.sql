ALTER TABLE "albums" ALTER COLUMN "start_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "end_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "postDate" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "album_codes" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "buy_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "activation_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;