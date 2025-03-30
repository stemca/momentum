import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
		DATABASE_URL: z.string(),
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		DISCORD_CALLBACK_URL: z.string(),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		DISCORD_CALLBACK_URL: process.env.DISCORD_CALLBACK_URL,
		// NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
	},
	skipValidation: !!process.env.SKIP_VALIDATION,
});

export default env;
