import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const accounts = sqliteTable("account", {
	id: text("id")
		.primaryKey()
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.references(() => users.id, {
			onDelete: "cascade",
		})
		.notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	...timestamps,
});

export type Account = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
