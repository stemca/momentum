CREATE TABLE `user` (
	`id` text(256) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer
);
