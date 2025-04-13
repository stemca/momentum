import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";

import * as schemas from "./schemas";

const client = postgres(env.DATABASE_URL);

export const db = drizzle({
	client,
	schema: schemas,
});
