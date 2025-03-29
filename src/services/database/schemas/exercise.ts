import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { activities } from "./activity";
import { workouts } from "./workout";

export const exercises = sqliteTable(
	"exercise",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => createId()),
		activityId: text("activityId")
			.references(() => activities.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		workoutId: text("workout_id")
			.references(() => workouts.id, {
				onDelete: "cascade",
			})
			.notNull(),
		type: text("type", {
			enum: ["cardio", "strength", "calisthenic"],
		}).notNull(),
		description: text("description"),
		...timestamps,
	},
	(t) => [
		index("exercise_activity_id_idx").on(t.activityId),
		index("exercise_workout_id_idx").on(t.workoutId),
	],
);

export type SelectExercise = typeof exercises.$inferSelect;
export type Exercise = typeof exercises.$inferInsert;
