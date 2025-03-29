import { os, ORPCError } from "@orpc/server";

import type { AuthContextType } from "../types";

export const authProviderMiddleware = os
	.$context<AuthContextType>()
	.middleware(async ({ context, next }) => {
		if (!context.session || !context.user) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "You must be signed in to do this",
			});
		}
		return next();
	});
