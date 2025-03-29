import { createId } from "@paralleldrive/cuid2";
import {
	index,
	integer,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const goals = sqliteTable(
	"goal",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		title: text("title").notNull(), // e.g., "Walk 5 miles this week"
		description: text("description"), // Optional additional details
		type: text("type", { enum: ["trackable", "non_trackable"] }).notNull(), // Type of goal
		targetAmount: real("target_amount"), // For goals like "Walk 5 miles", this would be 5
		unit: text("unit"), // E.g., "miles", "times", etc.
		startDate: integer("start_date", { mode: "timestamp" }).notNull(),
		endDate: integer("end_date", { mode: "timestamp" }),
		completed: integer("completed", { mode: "boolean" }).default(false),
		progress: real("progress").default(0),
		...timestamps,
	},
	(t) => [index("goals_user_id_idx").on(t.userId)],
);

export type SelectGoal = typeof goals.$inferSelect;
export type Goal = typeof goals.$inferInsert;
