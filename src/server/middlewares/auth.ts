import { os, ORPCError } from "@orpc/server";
import { cookies } from "next/headers";

import { validateSessionToken } from "@/services/auth/session";
import type { AuthContextType } from "../types";

export const authProviderMiddleware = os
	.$context<AuthContextType>()
	.middleware(async ({ context, next }) => {
		if (context.session && context.session) {
			return next({
				context: {
					user: context.user,
					session: context.session,
				},
			});
		}
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get("momentum_session")?.value ?? null;

		if (!sessionToken) {
			throw new ORPCError("UNAUTHORIZED");
		}

		const { session, user } = await validateSessionToken(sessionToken);

		if (!session || !user) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "You must be logged in to do that",
			});
		}

		return next({
			context: {
				user: user,
				session: session,
			},
		});
	});
