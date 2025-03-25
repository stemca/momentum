import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
	path: "./.env",
});

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL");
}

if (!process.env.DATABASE_AUTH_TOKEN && process.env.NODE_ENV === "production") {
	throw new Error("Missing DATABASE_AUTH_TOKEN - required for production");
}

export default {
	out: "./src/services/database/migrations",
	schema: "./src/services/database/schemas/",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
	verbose: true,
	casing: "snake_case",
} satisfies Config;
