import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import { SessionHeadersSchema } from "@/schemas/request";
import { ResponseSchema } from "@/schemas/response";
import type { ContextVariables } from "@/server/types";
import { sessions } from "@/services/db/schemas";

export const route = createRoute({
	method: "post",
	path: "/api/auth/logout",
	tags: ["Auth"],
	summary: "Logout",
	request: {
		headers: SessionHeadersSchema,
	},
	responses: {
		200: {
			description: "Success",
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
		},
	},
});

export const logout = new OpenAPIHono<{
	Variables: ContextVariables;
}>().openapi(route, async (c) => {
	const db = c.get("db");
	const { momentum_session_id: sessionId } = c.req.valid("header");

	await db.delete(sessions).where(eq(sessions.id, sessionId));

	return c.json({ message: "Logged out successfully" }, 200);
});
