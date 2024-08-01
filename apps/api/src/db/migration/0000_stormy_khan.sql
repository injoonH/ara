CREATE TABLE IF NOT EXISTS "auth_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_group_auth_permission" (
	"group_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_group_auth_permission_group_id_permission_id_pk" PRIMARY KEY("group_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_kaist" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"uid" varchar(16) NOT NULL,
	"name_ko" varchar(64) NOT NULL,
	"name_en" varchar(64) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(16) NOT NULL,
	"student_number" smallint NOT NULL,
	"department_id" smallint NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "auth_kaist_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"code" varchar(64) NOT NULL,
	CONSTRAINT "auth_permission_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"username" varchar(64) NOT NULL,
	"display_name" varchar(64) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(60) NOT NULL,
	CONSTRAINT "auth_user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_group_auth_user" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_group_auth_user_user_id_group_id_pk" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_permission_auth_user" (
	"user_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_permission_auth_user_user_id_permission_id_pk" PRIMARY KEY("user_id","permission_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_group_auth_permission" ADD CONSTRAINT "auth_group_auth_permission_group_id_auth_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_group_auth_permission" ADD CONSTRAINT "auth_group_auth_permission_permission_id_auth_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."auth_permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_kaist" ADD CONSTRAINT "auth_kaist_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_group_auth_user" ADD CONSTRAINT "auth_group_auth_user_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_group_auth_user" ADD CONSTRAINT "auth_group_auth_user_group_id_auth_group_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_permission_auth_user" ADD CONSTRAINT "auth_permission_auth_user_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_permission_auth_user" ADD CONSTRAINT "auth_permission_auth_user_permission_id_auth_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."auth_permission"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
