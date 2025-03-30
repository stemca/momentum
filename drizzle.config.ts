import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import env from "@/utils/env";

dotenv.config({
	path: "./.env",
});

export default {
	out: "./src/services/database/migrations",
	schema: "./src/services/database/schemas/",
	dialect: "turso",
	dbCredentials: {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	},
	verbose: true,
	casing: "snake_case",
} satisfies Config;
