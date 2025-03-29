import { createId } from "@paralleldrive/cuid2";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../timestamps";

export const activities = sqliteTable("activity", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId())
		.notNull(),
	date: integer({ mode: "timestamp" }).notNull(),
	title: text().notNull(),
	description: text(),
	...timestamps,
});

export type SelectActivity = typeof activities.$inferSelect;
export type Activity = typeof activities.$inferInsert;
