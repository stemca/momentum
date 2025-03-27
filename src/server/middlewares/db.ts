import { os } from "@orpc/server";

import { db } from "@/services/database";
import type { DbContextType } from "../types";

export const dbProviderMiddleware = os
	.$context<DbContextType>()
	.middleware(async ({ context, next }) => {
		const database: typeof db = context.db ?? db;
		return next({
			context: {
				db: database,
			},
		});
	});
