import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const accounts = pgTable("account", {
	id: uuid("id").primaryKey().defaultRandom(),

	userId: uuid("user_id")
		.references(() => users.id, {
			onDelete: "cascade",
		})
		.notNull(),
	accountId: varchar("account_id").notNull(),
	providerId: varchar("provider_id").notNull(),
	...timestamps,
});

export type Account = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
