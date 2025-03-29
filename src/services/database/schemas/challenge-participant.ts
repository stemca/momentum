import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { challenges } from "./challenge";
import { users } from "./user";

export const challengeParticipants = sqliteTable(
	"challenge_participant",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		challengeId: text("challenge_id")
			.references(() => challenges.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		userId: text("user_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		joinedDate: integer("joined_date", { mode: "timestamp" }).notNull(),
		status: text("status", {
			enum: ["invited", "accepted", "declined"],
		}).default("invited"),
		...timestamps,
	},
	(t) => [
		index("challenge_participants_challenge_id_idx").on(t.challengeId),
		index("challenge_participants_user_id_idx").on(t.userId),
	],
);

export type ChallengeParticipant = typeof challengeParticipants.$inferInsert;
export type SelectChallengeParticipant =
	typeof challengeParticipants.$inferSelect;
