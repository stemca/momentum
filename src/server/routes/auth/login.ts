import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import { LoginSchema } from "@/schemas/auth";
import { ResponseSchema } from "@/schemas/response";
import type { ContextVariables } from "@/server/types";
import { createSession, generateSessionToken } from "@/services/auth/session";
import { CreateSessionSchema, users } from "@/services/db/schemas";
import { verifyPasswordHash } from "@/utils/password";

const route = createRoute({
	method: "post",
	path: "/api/auth/login",
	tags: ["Auth"],
	summary: "Login",
	request: {
		body: {
			description: "Login request",
			content: {
				"application/json": {
					schema: LoginSchema,
				},
			},
			required: true,
		},
	},
	responses: {
		200: {
			description: "User logged in successfully",
			content: {
				"application/json": {
					schema: CreateSessionSchema,
				},
			},
		},
		400: {
			description: "User has no password",
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
		},
		401: {
			description: "Incorrect email or password",
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
		},
	},
});

export const login = new OpenAPIHono<{ Variables: ContextVariables }>().openapi(
	route,
	async (c) => {
		const { email, password } = c.req.valid("json");
		const db = c.get("db");

		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email),
		});
		if (!existingUser) {
			return c.json({ message: "Incorrect email or password" }, 401);
		}

		// a user has signed an account with oauth, they should create a password in their settings
		if (!existingUser.password) {
			return c.json(
				{
					message:
						"You have an account without a password, please sign in with oauth or create a password in your settings",
				},
				400,
			);
		}

		if ((await verifyPasswordHash(existingUser.password, password)) === false) {
			return c.json({ message: "Incorrect email or password" }, 401);
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);

		return c.json(session, 200);
	},
);
