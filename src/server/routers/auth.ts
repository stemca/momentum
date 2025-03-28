import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";

import { SessionSchema } from "@/schemas/session";
import { NewUserSchema } from "@/schemas/user";
import { createSession, generateSessionToken } from "@/services/auth/session";
import { users } from "@/services/database/schemas";
import { hashPassword } from "@/utils/password";
import { pub } from "../clients";

export const signUp = pub
	.route({
		method: "POST",
		path: "/auth/sign-up",
		summary: "Sign up a new user",
		tags: ["authentication"],
	})
	.errors({
		CONFLICT: {
			message: "A user already exists with this email address",
		},
	})
	.input(NewUserSchema)
	.output(SessionSchema)
	.handler(async ({ context, input, errors }) => {
		// find existing user
		const existingUser = await context.db.query.users.findFirst({
			where: eq(users.email, input.email),
		});
		if (existingUser) {
			throw errors.CONFLICT();
		}

		// create new user and hash password
		const hashedPassword = await hashPassword(input.password);

		const [user] = await context.db
			.insert(users)
			.values({
				...input,
				password: hashedPassword,
			})
			.returning({ insertedId: users.id });

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.insertedId);

		return session;
	})
	.actionable();
