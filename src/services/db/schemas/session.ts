import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const sessions = pgTable(
	"session",
	{
		id: varchar({ length: 256 }).primaryKey().notNull(),
		userId: uuid("user_id")
			.references(() => users.id, {
				onDelete: "cascade",
			})
			.notNull(),
		expiresAt: timestamp("expires_at", {
			withTimezone: true,
			precision: 6,
		}).notNull(),
		...timestamps,
	},
	(t) => [index("session_user_id_idx").on(t.userId)],
);

export type SelectSession = typeof sessions.$inferSelect;
export type Session = typeof sessions.$inferInsert;

export const CreateSessionSchema = createInsertSchema(sessions);
export const SelectSessionSchema = createSelectSchema(sessions);
