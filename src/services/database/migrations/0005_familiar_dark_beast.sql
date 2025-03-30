CREATE TABLE `activity` (
	`id` text PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `calisthenic_exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`exercise_id` text NOT NULL,
	`category` text,
	`sets` integer NOT NULL,
	`reps` integer NOT NULL,
	`difficulty` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `calisthentic_exercise_id_idx` ON `calisthenic_exercise` (`exercise_id`);--> statement-breakpoint
CREATE TABLE `cardio_exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`exercise_id` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`distance` real NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `cardio_exercises_id_idx` ON `cardio_exercise` (`exercise_id`);--> statement-breakpoint
CREATE TABLE `challenge_invitation` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_id` text NOT NULL,
	`user_id` text NOT NULL,
	`invitation_date` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenge`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `challenge_invitation_challenge_id_idx` ON `challenge_invitation` (`challenge_id`);--> statement-breakpoint
CREATE INDEX `challenge_invitation_user_id_idx` ON `challenge_invitation` (`user_id`);--> statement-breakpoint
CREATE TABLE `challenge_participant` (
	`id` text PRIMARY KEY NOT NULL,
	`challenge_id` text NOT NULL,
	`user_id` text NOT NULL,
	`joined_date` integer NOT NULL,
	`status` text DEFAULT 'invited',
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`challenge_id`) REFERENCES `challenge`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `challenge_participants_challenge_id_idx` ON `challenge_participant` (`challenge_id`);--> statement-breakpoint
CREATE INDEX `challenge_participants_user_id_idx` ON `challenge_participant` (`user_id`);--> statement-breakpoint
CREATE TABLE `challenge` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`visibility` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `challenges_user_id_idx` ON `challenge` (`owner_id`);--> statement-breakpoint
CREATE TABLE `exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`activityId` text NOT NULL,
	`workout_id` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`activityId`) REFERENCES `activity`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `exercise_activity_id_idx` ON `exercise` (`activityId`);--> statement-breakpoint
CREATE INDEX `exercise_workout_id_idx` ON `exercise` (`workout_id`);--> statement-breakpoint
CREATE TABLE `friends` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id_1` text NOT NULL,
	`user_id_2` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`request_date` integer NOT NULL,
	`response_date` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id_1`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`user_id_2`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `friends_user_id1_idx` ON `friends` (`user_id_1`);--> statement-breakpoint
CREATE INDEX `friends_user_id2_idx` ON `friends` (`user_id_2`);--> statement-breakpoint
CREATE TABLE `goal` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`target_amount` real,
	`unit` text,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`completed` integer DEFAULT false,
	`progress` real DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `goals_user_id_idx` ON `goal` (`user_id`);--> statement-breakpoint
CREATE TABLE `strength_exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`exercise_id` text,
	`weight` text NOT NULL,
	`unit` text DEFAULT 'lbs' NOT NULL,
	`reps` text NOT NULL,
	`sets` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `strength_exercise_id_idx` ON `strength_exercise` (`exercise_id`);--> statement-breakpoint
CREATE TABLE `workout` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`video_url` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workout_name_unique` ON `workout` (`name`);--> statement-breakpoint
CREATE INDEX `workouts_name_idx` ON `workout` (`name`);--> statement-breakpoint
CREATE TABLE `user_infos` (
	`user_id` text PRIMARY KEY NOT NULL,
	`weight` real,
	`weight_unit` text DEFAULT 'lbs' NOT NULL,
	`height` real,
	`height_unit` text DEFAULT 'in' NOT NULL,
	`profile_picture` text,
	`birthdate` text,
	`gender` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
DROP INDEX "calisthentic_exercise_id_idx";--> statement-breakpoint
DROP INDEX "cardio_exercises_id_idx";--> statement-breakpoint
DROP INDEX "challenge_invitation_challenge_id_idx";--> statement-breakpoint
DROP INDEX "challenge_invitation_user_id_idx";--> statement-breakpoint
DROP INDEX "challenge_participants_challenge_id_idx";--> statement-breakpoint
DROP INDEX "challenge_participants_user_id_idx";--> statement-breakpoint
DROP INDEX "challenges_user_id_idx";--> statement-breakpoint
DROP INDEX "exercise_activity_id_idx";--> statement-breakpoint
DROP INDEX "exercise_workout_id_idx";--> statement-breakpoint
DROP INDEX "friends_user_id1_idx";--> statement-breakpoint
DROP INDEX "friends_user_id2_idx";--> statement-breakpoint
DROP INDEX "goals_user_id_idx";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
DROP INDEX "users_email_idx";--> statement-breakpoint
DROP INDEX "session_user_id_idx";--> statement-breakpoint
DROP INDEX "strength_exercise_id_idx";--> statement-breakpoint
DROP INDEX "workout_name_unique";--> statement-breakpoint
DROP INDEX "workouts_name_idx";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "password" TO "password" text(256);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (unixepoch() * 1000);--> statement-breakpoint
ALTER TABLE `session` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL DEFAULT (unixepoch() * 1000);