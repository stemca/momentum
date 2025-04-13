import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";

export const users = pgTable(
	"user",
	{
		id: uuid().notNull().defaultRandom().primaryKey(),
		name: varchar("name", { length: 256 }).notNull(),
		email: varchar("email", { length: 1024 }).notNull().unique(),
		password: varchar("password", { length: 256 }), // optional since we can use oauth
		...timestamps,
	},
	(t) => [index("users_email_idx").on(t.email)],
);

export type SelectUser = typeof users.$inferSelect;
export type User = typeof users.$inferInsert;

export const CreateUserSchema = createInsertSchema(users);
export const SelectUserSchema = createSelectSchema(users);
