import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";

export const users = sqliteTable("user", {
	id: text({ length: 256 })
		.notNull()
		.$defaultFn(() => createId())
		.primaryKey(),
	...timestamps,
});

export type SelectUser = typeof users.$inferSelect;
export type User = typeof users.$inferInsert;
