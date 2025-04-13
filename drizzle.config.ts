import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import { env } from "@/env";

dotenv.config({
	path: ".env",
});

export default {
	out: "./src/services/db/migrations",
	schema: "./src/services/db/schemas/",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	casing: "snake_case",
} satisfies Config;
