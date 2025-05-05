ALTER TABLE "subscriptions" ALTER COLUMN "buy_date" SET DATA TYPE timestamp WITH TIME ZONE USING "buy_date"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "buy_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "activation_date" SET DATA TYPE timestamp WITH TIME ZONE USING "activation_date"::timestamp with time zone;
