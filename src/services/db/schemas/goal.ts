import {
	boolean,
	index,
	integer,
	interval,
	pgEnum,
	pgTable,
	real,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const goalTypes = pgEnum("goal_type", ["trackable", "non_trackable"]);

export const goals = pgTable(
	"goal",
	{
		id: uuid("id").primaryKey().defaultRandom().notNull(),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		title: varchar("title").notNull(), // e.g., "Walk 5 miles this week"
		description: varchar("description"), // Optional additional details
		type: goalTypes().notNull().default("trackable"), // Type of goal
		targetAmount: real("target_amount"), // For goals like "Walk 5 miles", this would be 5
		unit: varchar("unit"), // E.g., "miles", "times", etc.
		duration: interval("duration").notNull(),
		completed: boolean("completed").default(false),
		progress: real("progress").default(0),
		...timestamps,
	},
	(t) => [index("goals_user_id_idx").on(t.userId)],
);

export type SelectGoal = typeof goals.$inferSelect;
export type Goal = typeof goals.$inferInsert;

export const CreateGoalSchema = createInsertSchema(goals);
export const SelectGoalSchema = createSelectSchema(goals);
