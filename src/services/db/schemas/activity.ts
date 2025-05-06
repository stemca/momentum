import {
	index,
	interval,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const activities = pgTable(
	"activity",
	{
		id: uuid().primaryKey().defaultRandom().notNull(),
		userId: uuid()
			.references(() => users.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		date: timestamp({
			withTimezone: true,
			precision: 6,
		}).notNull(),
		title: varchar().notNull(),
		description: varchar(),
		duration: interval().notNull(), // duration of the activity
		...timestamps,
	},
	(t) => [index("activity_user_id_idx").on(t.userId)],
);

export type SelectActivity = typeof activities.$inferSelect;
export type Activity = typeof activities.$inferInsert;

export const CreateActivitySchema = createInsertSchema(activities);
export const SelectActivitySchema = createSelectSchema(activities);
