import { ORPCError, implement } from "@orpc/server";
import type { z } from "zod";

import { contract } from "./contracts";
import { dbProviderMiddleware } from "./middlewares/db";
import type { ContextVariables } from "./types";

export const pub = implement(contract)
	.$context<ContextVariables>()
	.use(dbProviderMiddleware);

export const authed = pub.use(({ context, next }) => {
	if (!context.user || !context.session) {
		throw new ORPCError("UNAUTHORIZED", {
			message: "User not authenticated or session expired",
		});
	}

	return next({
		context: {
			user: context.user,
			session: context.session,
		},
	});
});
