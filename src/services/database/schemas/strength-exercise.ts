import {
	index,
	integer,
	pgEnum,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";
import { exercises } from "./exercise";

export const strengthExerciseUnitEnum = pgEnum("strength_exercise_unit", [
	"kg",
	"lbs",
]);

export const strengthExercises = pgTable(
	"strength_exercise",
	{
		id: uuid("id").primaryKey().defaultRandom().notNull(),
		exerciseId: uuid("exercise_id").references(() => exercises.id, {
			onDelete: "cascade",
			onUpdate: "cascade",
		}),
		weight: varchar("weight").notNull(),
		unit: strengthExerciseUnitEnum().notNull().default("lbs"),
		reps: integer("reps").notNull(),
		sets: integer("sets").notNull(),
		...timestamps,
	},
	(t) => [index("strength_exercise_id_idx").on(t.exerciseId)],
);

export type SelectStrengthExercise = typeof strengthExercises.$inferSelect;
export type StrengthExercise = typeof strengthExercises.$inferInsert;
