import { Hono } from "hono";
import { getCookie } from "hono/cookie";

import { db } from "@/services/database";

import { validateSessionToken } from "@/services/auth/session";
import type { ContextVariables } from "./types";

const app = new Hono<{ Variables: ContextVariables }>();

app.use(async (c, next) => {
	c.set("db", db);

	const sessionToken = getCookie(c, "momentum_session_token");

	if (!sessionToken) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}

	const { session, user } = await validateSessionToken(sessionToken);

	c.set("session", session);
	c.set("user", user);

	return next();
});

// setting up for rpc link
// export type AppType = typeof routes;

export { app };
