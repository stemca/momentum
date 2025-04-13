import { index, pgTable, smallint, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const calisthenicExercises = pgTable(
	"calisthenic_exercise",
	{
		id: uuid().primaryKey().defaultRandom().notNull(),
		exerciseId: uuid("exercise_id")
			.references(() => exercises.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		category: varchar("category"), // (Optional) Category of exercise (upper body, core, etc.)
		sets: smallint("sets").notNull(), // Number of sets
		reps: smallint("reps").notNull(), // Number of reps per set
		difficulty: varchar("difficulty"), // Difficulty level (beginner, intermediate, advanced)
		...timestamps,
	},
	(t) => [index("calisthentic_exercise_id_idx").on(t.exerciseId)],
);

export type CalisthenicExercise = typeof calisthenicExercises.$inferInsert;
export type SelectCalisthenicExercise =
	typeof calisthenicExercises.$inferSelect;

export const CreateCalisthenicExerciseSchema =
	createInsertSchema(calisthenicExercises);
export const SelectCalisthenicExerciseSchema =
	createSelectSchema(calisthenicExercises);
