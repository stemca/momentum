import { index, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { challenges } from "./challenge";
import { users } from "./user";

export const challengeInvitationStatus = pgEnum("challenge_invitation_status", [
	"pending",
	"accepted",
	"declined",
]);

export const challengeInvitations = pgTable(
	"challenge_invitation",
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
		invitationDate: timestamp("invitation_date", {
			withTimezone: true,
			precision: 6,
		}).notNull(),
		status: challengeInvitationStatus("status").default("pending"),
		...timestamps,
	},
	(t) => [
		index("challenge_invitation_challenge_id_idx").on(t.challengeId),
		index("challenge_invitation_user_id_idx").on(t.userId),
	],
);

export type ChallengeInvitation = typeof challengeInvitations.$inferInsert;
export type SelectChallengeInvitation =
	typeof challengeInvitations.$inferSelect;

export const CreateChallengeInvitationSchema =
	createInsertSchema(challengeInvitations);
export const SelectChallengeInvitationSchema =
	createSelectSchema(challengeInvitations);
