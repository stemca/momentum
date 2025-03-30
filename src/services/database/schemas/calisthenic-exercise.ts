import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const calisthenicExercises = sqliteTable(
	"calisthenic_exercise",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		exerciseId: text("exercise_id")
			.references(() => exercises.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		category: text("category"), // (Optional) Category of exercise (upper body, core, etc.)
		sets: integer("sets").notNull(), // Number of sets
		reps: integer("reps").notNull(), // Number of reps per set
		difficulty: text("difficulty"), // Difficulty level (beginner, intermediate, advanced)
		...timestamps,
	},
	(t) => [index("calisthentic_exercise_id_idx").on(t.exerciseId)],
);

export type CalisthenicExercise = typeof calisthenicExercises.$inferInsert;
export type SelectCalisthenicExercise =
	typeof calisthenicExercises.$inferSelect;
