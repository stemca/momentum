import { index, interval, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const challenges = pgTable(
	"challenge",
	{
		id: uuid("id").primaryKey().notNull().defaultRandom(),
		ownerId: uuid("owner_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(), // The user who created the challenge
		name: varchar("name").notNull(),
		description: varchar("description"),
		visibility: varchar("visibility", {
			enum: ["public", "private"],
		}).notNull(), // public or private
		duration: interval("duration").notNull(),
		...timestamps,
	},
	(t) => [index("challenges_user_id_idx").on(t.ownerId)],
);

export type SelectChallenge = typeof challenges.$inferSelect;
export type Challenge = typeof challenges.$inferInsert;

export const CreateChallengeSchema = createInsertSchema(challenges);
export const SelectChallengeSchema = createSelectSchema(challenges);
