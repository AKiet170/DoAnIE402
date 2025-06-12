CREATE TYPE "public"."apartment_type" AS ENUM('studio', '1_bed', '2_bed', '3_bed');--> statement-breakpoint
CREATE TYPE "public"."contract_type" AS ENUM('rent', 'sale');--> statement-breakpoint
CREATE TYPE "public"."maintenance_status" AS ENUM('pending', 'received', 'resolved', 'cancelled');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "apartment_furnitures" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer,
	"condition" varchar(100),
	"last_checked_at" date,
	"apartment_id" integer,
	"furniture_id" integer
);
--> statement-breakpoint
CREATE TABLE "apartments" (
	"id" serial PRIMARY KEY NOT NULL,
	"room_number" integer,
	"type" "apartment_type",
	"status" boolean,
	"floor_id" integer
);
--> statement-breakpoint
CREATE TABLE "contract" (
	"id" serial PRIMARY KEY NOT NULL,
	"sign_date" date,
	"expire_date" date,
	"value" numeric,
	"type" "contract_type",
	"status" boolean,
	"apartment_id" integer
);
--> statement-breakpoint
CREATE TABLE "floor" (
	"id" serial PRIMARY KEY NOT NULL,
	"floor_number" integer,
	"building_name" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "floor_property" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer,
	"floor_id" integer,
	"property_id" integer
);
--> statement-breakpoint
CREATE TABLE "furnitures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"default_image" varchar(255),
	"created_at" date
);
--> statement-breakpoint
CREATE TABLE "maintenance_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"description" text,
	"status" "maintenance_status",
	"created_at" date,
	"updated_at" date,
	"resident_id" integer,
	"apartment_id" integer
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text,
	"created_at" date,
	"user_id" text,
	"maintenance_request_id" integer
);
--> statement-breakpoint
CREATE TABLE "property" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"created_at" date
);
--> statement-breakpoint
CREATE TABLE "residents" (
	"id" serial PRIMARY KEY NOT NULL,
	"move_in_date" date,
	"is_primary" boolean,
	"user_id" text,
	"apartment_id" integer
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apartment_furnitures" ADD CONSTRAINT "apartment_furnitures_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apartment_furnitures" ADD CONSTRAINT "apartment_furnitures_furniture_id_furnitures_id_fk" FOREIGN KEY ("furniture_id") REFERENCES "public"."furnitures"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_floor_id_floor_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."floor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contract" ADD CONSTRAINT "contract_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floor_property" ADD CONSTRAINT "floor_property_floor_id_floor_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."floor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floor_property" ADD CONSTRAINT "floor_property_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_resident_id_residents_id_fk" FOREIGN KEY ("resident_id") REFERENCES "public"."residents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_maintenance_request_id_maintenance_requests_id_fk" FOREIGN KEY ("maintenance_request_id") REFERENCES "public"."maintenance_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "residents" ADD CONSTRAINT "residents_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "residents" ADD CONSTRAINT "residents_apartment_id_apartments_id_fk" FOREIGN KEY ("apartment_id") REFERENCES "public"."apartments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;