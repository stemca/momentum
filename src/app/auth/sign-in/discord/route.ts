import { generateState } from "arctic";
import { cookies } from "next/headers";

import { discord } from "@/services/auth/discord";
import env from "@/utils/env";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = discord.createAuthorizationURL(state, null, [
		"email",
		"identify",
	]);

	const cookieStore = await cookies();
	cookieStore.set("discord_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax",
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
		},
	});
}
