import { index, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const friendStatus = pgEnum("friend_status", [
	"pending",
	"accepted",
	"rejected",
]);

export const friends = pgTable(
	"friends",
	{
		id: uuid("id").primaryKey().defaultRandom().notNull(),
		// the user who initiated the friend request
		userId1: uuid("user_id_1")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		// the user who accepted or rejected the friend request
		userId2: uuid("user_id_2")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		status: friendStatus().notNull().default("pending"),
		requestDate: timestamp("request_date", {
			withTimezone: true,
			precision: 6,
		}).notNull(), // When the friend request was sent
		responseDate: timestamp("response_date", {
			withTimezone: true,
			precision: 6,
		}), // When the request was accepted or rejected
		...timestamps,
	},
	(t) => [
		index("friends_user_id1_idx").on(t.userId1),
		index("friends_user_id2_idx").on(t.userId2),
	],
);

export type Friend = typeof friends.$inferInsert;
export type SelectFriend = typeof friends.$inferSelect;

export const CreateFriendSchema = createInsertSchema(friends);
export const SelectFriendSchema = createSelectSchema(friends);
