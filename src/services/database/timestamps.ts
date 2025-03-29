import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/sqlite-core";

export const timestamps = {
	createdAt: int("created_at", {
		mode: "timestamp_ms",
	})
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: int("updated_at", {
		mode: "timestamp_ms",
	}).$onUpdateFn(() => new Date()),
};
