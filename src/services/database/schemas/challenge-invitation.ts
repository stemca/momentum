import { createId } from "@paralleldrive/cuid2";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { challenges } from "./challenge";
import { users } from "./user";

export const challengeInvitations = sqliteTable(
	"challenge_invitation",
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
		invitationDate: integer("invitation_date", { mode: "timestamp" }).notNull(),
		status: text("status", {
			enum: ["pending", "accepted", "declined"],
		}).default("pending"),
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
