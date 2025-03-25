import { sql } from "drizzle-orm";
import { int } from "drizzle-orm/sqlite-core";

export const timestamps = {
	createdAt: int({
		mode: "timestamp_ms",
	})
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: int({
		mode: "timestamp_ms",
	}).$onUpdate(() => sql`(unixepoch())`),
};
