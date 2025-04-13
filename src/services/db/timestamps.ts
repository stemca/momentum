import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
	createdAt: timestamp("created_at", {
		withTimezone: true,
		precision: 6,
	})
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", {
		precision: 6,
		withTimezone: true,
	}).$onUpdate(() => new Date()),
};
