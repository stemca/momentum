CREATE TABLE `session` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`user_id` text,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `session` (`user_id`);