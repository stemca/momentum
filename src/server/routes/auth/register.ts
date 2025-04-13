import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import { RegisterSchema } from "@/schemas/auth";
import { ResponseSchema } from "@/schemas/response";
import type { ContextVariables } from "@/server/types";
import { createSession, generateSessionToken } from "@/services/auth/session";
import { CreateSessionSchema, users } from "@/services/db/schemas";
import { hashPassword } from "@/utils/password";

const route = createRoute({
	method: "post",
	path: "/api/auth/register",
	tags: ["Auth"],
	summary: "Register",
	request: {
		body: {
			description: "Register request",
			content: {
				"application/json": {
					schema: RegisterSchema,
				},
			},
			required: true,
		},
	},
	responses: {
		201: {
			description: "User registered successfully",
			content: {
				"application/json": {
					schema: CreateSessionSchema,
				},
			},
		},
		400: {
			description: "Something went wrong",
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
		},
		409: {
			description: "User already exists",
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
		},
	},
});

export const register = new OpenAPIHono<{
	Variables: ContextVariables;
}>().openapi(route, async (c) => {
	const db = c.get("db");
	const { email, password, name } = c.req.valid("json");

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (existingUser) {
		return c.json(
			{ message: "A user already exists with this email address" },
			409,
		);
	}

	const passwordHash = await hashPassword(password);

	const [user] = await db
		.insert(users)
		.values({ email, name, password: passwordHash })
		.returning();
	if (!user) {
		return c.json({ message: "Something went wrong" }, 400);
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);

	return c.json(session, 201);
});
