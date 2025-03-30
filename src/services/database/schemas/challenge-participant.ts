import { index, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { timestamps } from "../timestamps";
import { challenges } from "./challenge";
import { users } from "./user";

export const challengeParticipantStatus = pgEnum(
	"challenge_participant_status",
	["invited", "accepted", "declined"],
);

export const challengeParticipants = pgTable(
	"challenge_participant",
	{
		id: uuid("id").primaryKey().defaultRandom().notNull(),
		challengeId: uuid("challenge_id")
			.references(() => challenges.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		userId: uuid("user_id")
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
			.notNull(),
		joinedDate: timestamp("joined_date", {
			withTimezone: true,
			precision: 6,
		}).notNull(),
		status: challengeParticipantStatus().notNull().default("invited"),
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
