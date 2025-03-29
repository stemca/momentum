import { os, ORPCError } from "@orpc/server";
import { cookies } from "next/headers";

import { validateSessionToken } from "@/services/auth/session";
import type { AuthContextType } from "../types";

export const authProviderMiddleware = os
	.$context<AuthContextType>()
	.middleware(async ({ context, next }) => {
		const cookieStore = await cookies();
		const { session, user } =
			context ??
			(await validateSessionToken(
				cookieStore.get("momentum_session")?.value ?? "",
			));

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
