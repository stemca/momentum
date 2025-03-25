import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schemas from "./schemas";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (
	!process.env.DATABASE_AUTH_TOKEN &&
	process.env.NODE_ENV !== "development"
) {
	throw new Error("DATABASE_AUTH_TOKEN is not set");
}

const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle({ client, schema: schemas });
