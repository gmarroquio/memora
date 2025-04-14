CREATE TABLE "blog_images" (
	"id" varchar PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"post_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_images" ADD CONSTRAINT "blog_images_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;