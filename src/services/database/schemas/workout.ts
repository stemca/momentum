import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../timestamps";

export const workouts = sqliteTable(
	"workout",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		name: text().notNull().unique(), // the name of the workout, e.g. "bench press"
		category: text({ enum: ["strength", "cardio", "calisthenics"] }).notNull(), // corresponds to the type of exercise, e.g. "strength", "cardio", "calisthenics"
		description: text().notNull(), // a description of the workout, e.g. "bench press with dumbbells"
		videoUrl: text("video_url"), // a URL to a video of the workout, e.g. "https://www.youtube.com/watch?v=1234567890"
		...timestamps,
	},
	(t) => [index("workouts_name_idx").on(t.name)],
);

export type Workout = typeof workouts.$inferInsert;
export type SelectWorkout = typeof workouts.$inferSelect;
