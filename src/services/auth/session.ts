import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32NoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";

import type { Session, User } from "@/services/database/schemas";
import { sessions, users } from "@/services/database/schemas";
import { db } from "../database";

export const generateSessionToken = (): string => {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32NoPadding(bytes);
	return token;
};

export const createSession = async (
	token: string,
	userId: string,
): Promise<Session> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
	} satisfies Session;

	await db.insert(sessions).values(session).returning();

	return session;
};

export const validateSessionToken = async (
	token: string,
): Promise<SessionValidationResult> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const result = await db
		.select({ user: users, session: sessions })
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}

	const { user, session } = result[0];

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessions).where(eq(sessions.id, session.id));
		return { session: null, user: null };
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 30) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessions)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessions.id, session.id));
	}

	return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
};

export const invalidateAllSessions = async (userId: string): Promise<void> => {
	await db.delete(sessions).where(eq(sessions.userId, userId));
};

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
