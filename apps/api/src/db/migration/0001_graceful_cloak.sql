CREATE TABLE IF NOT EXISTS "board" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"slug" varchar(64) NOT NULL,
	"name_ko" varchar(64) NOT NULL,
	"name_en" varchar(64) NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "board_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name_ko" varchar(64) NOT NULL,
	"name_en" varchar(64) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_group_id_board_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."board_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
