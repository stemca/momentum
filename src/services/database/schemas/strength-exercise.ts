import { createId } from "@paralleldrive/cuid2";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const strengthExercises = sqliteTable(
	"strength_exercise",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		exerciseId: text("exercise_id").references(() => exercises.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
		weight: text("weight").notNull(),
		unit: text("unit", { enum: ["kg", "lbs"] })
			.notNull()
			.default("lbs"),
		reps: text("reps").notNull(),
		sets: text("sets").notNull(),

		...timestamps,
	},
	(t) => [index("strength_exercise_id_idx").on(t.exerciseId)],
);

export type SelectStrengthExercise = typeof strengthExercises.$inferSelect;
export type StrengthExercise = typeof strengthExercises.$inferInsert;
