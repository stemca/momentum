import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DATABASE_URL: z.string().url(),
	DATABASE_AUTH_TOKEN: z.string().optional(), // only required in prod
	DISCORD_CLIENT_ID: z.string(),
	DISCORD_CLIENT_SECRET: z.string(),
	DISCORD_CALLBACK_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;
