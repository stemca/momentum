import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";

export const activities = pgTable("activity", {
	id: uuid().primaryKey().defaultRandom().notNull(),
	date: timestamp({
		withTimezone: true,
		precision: 6,
	}).notNull(),
	title: varchar().notNull(),
	description: varchar(),
	...timestamps,
});

export type SelectActivity = typeof activities.$inferSelect;
export type Activity = typeof activities.$inferInsert;

export const CreateActivitySchema = createInsertSchema(activities);
export const SelectActivitySchema = createSelectSchema(activities);
