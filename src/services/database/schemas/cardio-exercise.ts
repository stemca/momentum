import { index, interval, pgTable, real, uuid } from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const cardioExercises = pgTable(
	"cardio_exercise",
	{
		id: uuid("id").primaryKey().notNull().defaultRandom(),
		exerciseId: uuid("exercise_id")
			.references(() => exercises.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		duration: interval("duration").notNull(),
		distance: real("distance").notNull(),
		// optional fields
		...timestamps,
	},
	(t) => [index("cardio_exercises_id_idx").on(t.exerciseId)],
);

export type SelectCardioExercise = typeof cardioExercises.$inferSelect;
export type CardioExercise = typeof cardioExercises.$inferInsert;
