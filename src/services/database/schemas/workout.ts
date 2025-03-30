import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";

export const workouts = pgTable(
	"workout",
	{
		id: uuid().primaryKey().defaultRandom().notNull(),
		name: varchar().notNull().unique(), // the name of the workout, e.g. "bench press"
		category: varchar({
			enum: ["strength", "cardio", "calisthenics"],
		}).notNull(), // corresponds to the type of exercise, e.g. "strength", "cardio", "calisthenics"
		description: varchar().notNull(), // a description of the workout, e.g. "bench press with dumbbells"
		videoUrl: varchar("video_url"), // a URL to a video of the workout, e.g. "https://www.youtube.com/watch?v=1234567890"
		...timestamps,
	},
	(t) => [index("workouts_name_idx").on(t.name)],
);

export type Workout = typeof workouts.$inferInsert;
export type SelectWorkout = typeof workouts.$inferSelect;
