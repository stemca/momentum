import { createId } from "@paralleldrive/cuid2";
import {
	index,
	integer,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const cardioExercises = sqliteTable(
	"cardio_exercise",
	{
		id: text("id")
			.primaryKey()
			.notNull()
			.$defaultFn(() => createId()),
		exerciseId: text("exercise_id")
			.references(() => exercises.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		startTime: integer("start_time", { mode: "timestamp_ms" }).notNull(),
		endTime: integer("end_time", { mode: "timestamp_ms" }).notNull(),
		distance: real("distance").notNull(),
		// optional fields
		...timestamps,
	},
	(t) => [index("cardio_exercises_id_idx").on(t.exerciseId)],
);

export type SelectCardioExercise = typeof cardioExercises.$inferSelect;
export type CardioExercise = typeof cardioExercises.$inferInsert;
