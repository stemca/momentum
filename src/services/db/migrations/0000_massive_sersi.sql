CREATE TYPE "public"."challenge_invitation_status" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "public"."challenge_participant_status" AS ENUM('invited', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "public"."exercise_type" AS ENUM('cardio', 'strength', 'calisthenic');--> statement-breakpoint
CREATE TYPE "public"."friend_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('trackable', 'non_trackable');--> statement-breakpoint
CREATE TYPE "public"."strength_exercise_unit" AS ENUM('kg', 'lbs');--> statement-breakpoint
CREATE TYPE "public"."height_unit" AS ENUM('cm', 'in');--> statement-breakpoint
CREATE TYPE "public"."weight_unit" AS ENUM('kg', 'lbs');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" varchar NOT NULL,
	"provider_id" varchar NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"date" timestamp (6) with time zone NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "calisthenic_exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_id" uuid NOT NULL,
	"category" varchar,
	"sets" smallint NOT NULL,
	"reps" smallint NOT NULL,
	"difficulty" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "cardio_exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_id" uuid NOT NULL,
	"duration" interval NOT NULL,
	"distance" real NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "challenge_invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"challenge_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"invitation_date" timestamp (6) with time zone NOT NULL,
	"status" "challenge_invitation_status" DEFAULT 'pending',
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "challenge_participant" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"challenge_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"joined_date" timestamp (6) with time zone NOT NULL,
	"status" "challenge_participant_status" DEFAULT 'invited' NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "challenge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"visibility" varchar NOT NULL,
	"duration" interval NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activityId" uuid NOT NULL,
	"workout_id" uuid NOT NULL,
	"type" "exercise_type" NOT NULL,
	"description" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "friends" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id_1" uuid NOT NULL,
	"user_id_2" uuid NOT NULL,
	"status" "friend_status" DEFAULT 'pending' NOT NULL,
	"request_date" timestamp (6) with time zone NOT NULL,
	"response_date" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "goal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"type" "goal_type" DEFAULT 'trackable' NOT NULL,
	"target_amount" real,
	"unit" varchar,
	"duration" interval NOT NULL,
	"completed" boolean DEFAULT false,
	"progress" real DEFAULT 0,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(1024) NOT NULL,
	"password" varchar(256),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "strength_exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exercise_id" uuid,
	"weight" varchar NOT NULL,
	"unit" "strength_exercise_unit" DEFAULT 'lbs' NOT NULL,
	"reps" integer NOT NULL,
	"sets" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
CREATE TABLE "workout" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"description" varchar NOT NULL,
	"video_url" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone,
	CONSTRAINT "workout_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_infos" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"weight" real,
	"weight_unit" "weight_unit" DEFAULT 'lbs' NOT NULL,
	"height" real,
	"height_unit" "height_unit" DEFAULT 'in' NOT NULL,
	"profile_picture" varchar,
	"birthdate" varchar,
	"gender" varchar,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "calisthenic_exercise" ADD CONSTRAINT "calisthenic_exercise_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "cardio_exercise" ADD CONSTRAINT "cardio_exercise_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "challenge_invitation" ADD CONSTRAINT "challenge_invitation_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenge"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "challenge_invitation" ADD CONSTRAINT "challenge_invitation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "challenge_participant" ADD CONSTRAINT "challenge_participant_challenge_id_challenge_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenge"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "challenge_participant" ADD CONSTRAINT "challenge_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_activityId_activity_id_fk" FOREIGN KEY ("activityId") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_1_user_id_fk" FOREIGN KEY ("user_id_1") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "friends" ADD CONSTRAINT "friends_user_id_2_user_id_fk" FOREIGN KEY ("user_id_2") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "goal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "strength_exercise" ADD CONSTRAINT "strength_exercise_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "activity_user_id_idx" ON "activity" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "calisthentic_exercise_id_idx" ON "calisthenic_exercise" USING btree ("exercise_id");--> statement-breakpoint
CREATE INDEX "cardio_exercises_id_idx" ON "cardio_exercise" USING btree ("exercise_id");--> statement-breakpoint
CREATE INDEX "challenge_invitation_challenge_id_idx" ON "challenge_invitation" USING btree ("challenge_id");--> statement-breakpoint
CREATE INDEX "challenge_invitation_user_id_idx" ON "challenge_invitation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "challenge_participants_challenge_id_idx" ON "challenge_participant" USING btree ("challenge_id");--> statement-breakpoint
CREATE INDEX "challenge_participants_user_id_idx" ON "challenge_participant" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "challenges_user_id_idx" ON "challenge" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "exercise_activity_id_idx" ON "exercise" USING btree ("activityId");--> statement-breakpoint
CREATE INDEX "exercise_workout_id_idx" ON "exercise" USING btree ("workout_id");--> statement-breakpoint
CREATE INDEX "friends_user_id1_idx" ON "friends" USING btree ("user_id_1");--> statement-breakpoint
CREATE INDEX "friends_user_id2_idx" ON "friends" USING btree ("user_id_2");--> statement-breakpoint
CREATE INDEX "goals_user_id_idx" ON "goal" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "strength_exercise_id_idx" ON "strength_exercise" USING btree ("exercise_id");--> statement-breakpoint
CREATE INDEX "workouts_name_idx" ON "workout" USING btree ("name");