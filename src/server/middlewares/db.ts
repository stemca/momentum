import { db } from "@/services/database";
import { os } from "@orpc/server";

export const dbProviderMiddleware = os
	.$context<{ db?: typeof db }>()
	.middleware(async ({ context, next }) => {
		const database: typeof db = context.db ?? db;

		return next({
			context: {
				db: database,
			},
		});
	});
