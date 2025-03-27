ALTER TABLE `user` ADD `first_name` text(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `email` text(1024) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text(256) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `user` (`email`);