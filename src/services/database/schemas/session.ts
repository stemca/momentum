import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const sessions = sqliteTable(
	"session",
	{
		id: text({ length: 256 }).primaryKey().notNull(),
		userId: text("user_id").references(() => users.id, {
			onDelete: "cascade",
		}),
		expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
		...timestamps,
	},
	(t) => [index("session_user_id_idx").on(t.userId)],
);

export type SelectSession = typeof sessions.$inferSelect;
export type Session = typeof sessions.$inferInsert;
