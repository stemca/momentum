import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const friends = sqliteTable(
	"friends",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		// the user who initiated the friend request
		userId1: text("user_id_1")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		// the user who accepted or rejected the friend request
		userId2: text("user_id_2")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		status: text("status", { enum: ["pending", "accepted", "rejected"] })
			.notNull()
			.default("pending"),
		requestDate: integer("request_date", { mode: "timestamp" }).notNull(), // When the friend request was sent
		responseDate: integer("response_date", { mode: "timestamp" }), // When the request was accepted or rejected
		...timestamps,
	},
	(t) => [
		index("friends_user_id1_idx").on(t.userId1),
		index("friends_user_id2_idx").on(t.userId2),
	],
);

export type Friend = typeof friends.$inferInsert;
export type SelectFriend = typeof friends.$inferSelect;
