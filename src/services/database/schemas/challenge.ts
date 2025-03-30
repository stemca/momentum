import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const challenges = sqliteTable(
	"challenge",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		ownerId: text("owner_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(), // The user who created the challenge
		name: text("name").notNull(),
		description: text("description"),
		visibility: text("visibility", { enum: ["public", "private"] }).notNull(), // public or private
		startDate: integer("start_date", { mode: "timestamp_ms" }).notNull(),
		endDate: integer("end_date", { mode: "timestamp_ms" }).notNull(),
		...timestamps,
	},
	(t) => [index("challenges_user_id_idx").on(t.ownerId)],
);

export type SelectChallenge = typeof challenges.$inferSelect;
export type Challenge = typeof challenges.$inferInsert;
