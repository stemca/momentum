import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

import env from "@/utils/env";

dotenv.config({
	path: ".env",
});

export default {
	out: "./src/services/database/migrations",
	schema: "./src/services/database/schemas/",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
	casing: "snake_case",
} satisfies Config;
