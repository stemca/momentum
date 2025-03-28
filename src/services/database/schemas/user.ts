import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";

export const users = sqliteTable(
	"user",
	{
		id: text({ length: 256 })
			.notNull()
			.$defaultFn(() => createId())
			.primaryKey(),
		name: text("name", { length: 256 }).notNull(),
		email: text("email", { length: 1024 }).notNull().unique(),
		password: text("password", { length: 256 }),
		...timestamps,
	},
	(t) => [index("users_email_idx").on(t.email)],
);

export type SelectUser = typeof users.$inferSelect;
export type User = typeof users.$inferInsert;
