import { eq } from "drizzle-orm";

import { SessionSchema } from "@/schemas/session";
import { NewUserSchema, SignInSchema } from "@/schemas/user";
import {
	createSession,
	generateSessionToken,
	invalidateSession,
} from "@/services/auth/session";
import { users } from "@/services/database/schemas";
import { hashPassword, verifyPasswordHash } from "@/utils/password";
import { authed, pub } from "../clients";

export const signUp = pub
	.route({
		method: "POST",
		path: "/auth/sign-up",
		summary: "Sign up a new user",
		tags: ["authentication"],
		successStatus: 201,
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

export const signIn = pub
	.route({
		method: "POST",
		path: "/auth/sign-in",
		summary: "Sign in",
		tags: ["authentication"],
		successStatus: 201,
	})
	.errors({
		BAD_REQUEST: {
			message:
				"You have an account without a password, please sign in with oauth or link in your settings",
		},
		UNAUTHORIZED: {
			message: "Invalid email or password",
		},
	})
	.input(SignInSchema)
	.output(SessionSchema)
	.handler(async ({ context, input, errors }) => {
		// find existing user
		const existingUser = await context.db.query.users.findFirst({
			where: eq(users.email, input.email),
		});

		if (!existingUser) {
			throw errors.UNAUTHORIZED();
		}

		if (!existingUser.password) {
			// a user has signed up with oauth, should sign in with oauth or link in their settings
			throw errors.BAD_REQUEST();
		}

		if (!(await verifyPasswordHash(existingUser.password, input.password))) {
			throw errors.BAD_REQUEST();
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);

		return session;
	})
	.actionable();

export const signOut = authed
	.route({
		method: "DELETE",
		path: "/auth/sign-out",
		summary: "Sign out",
		tags: ["authentication"],
		successStatus: 204,
	})
	.handler(async ({ context }) => {
		await invalidateSession(context.session.id);
	})
	.actionable();
