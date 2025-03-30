import { index, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";
import { activities } from "./activity";
import { workouts } from "./workout";

export const exerciseTypes = pgEnum("exercise_type", [
	"cardio",
	"strength",
	"calisthenic",
]);

export const exercises = pgTable(
	"exercise",
	{
		id: uuid("id").primaryKey().defaultRandom().notNull(),
		activityId: uuid("activityId")
			.references(() => activities.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		workoutId: uuid("workout_id")
			.references(() => workouts.id, {
				onDelete: "cascade",
			})
			.notNull(),
		type: exerciseTypes("type").notNull(),
		description: varchar("description"),
		...timestamps,
	},
	(t) => [
		index("exercise_activity_id_idx").on(t.activityId),
		index("exercise_workout_id_idx").on(t.workoutId),
	],
);

export type SelectExercise = typeof exercises.$inferSelect;
export type Exercise = typeof exercises.$inferInsert;
