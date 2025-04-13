import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { getCookie } from "hono/cookie";

import { authRoutes } from "@/server/routes/auth";
import type { ContextVariables } from "@/server/types";
import { validateSessionToken } from "@/services/auth/session";
import { db } from "@/services/db";
import { SESSION_COOKIE_NAME } from "@/utils/constants";
import { cors } from "hono/cors";

const app = new OpenAPIHono<{ Variables: ContextVariables }>();

app.use(
	cors({
		// TODO: add prod server for cors origin
		origin: ["http://localhost:3000"],
		credentials: true,
	}),
);

app.use(async (c, next) => {
	c.set("db", db);

	const sessionId = getCookie(c, SESSION_COOKIE_NAME);
	if (!sessionId) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	const { session, user } = await validateSessionToken(sessionId);

	c.set("user", user);
	c.set("session", session);
	return next();
});

app.doc31("/api/swagger.json", (c) => ({
	openapi: "3.1.0",
	info: { title: "Momentum API", version: "1.0.0" },
	servers: [
		{
			url: new URL(c.req.url).origin,
			description: "Development server",
		},
	],
}));

app.get(
	"/api/scalar",
	Scalar({
		url: "/api/swagger.json",
	}),
);

app.get("/", (c) => {
	return c.text("Hello World!");
});

const routes = app.route("/", authRoutes);

export type AppType = typeof routes;

export { app };
