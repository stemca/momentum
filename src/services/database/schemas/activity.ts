import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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
