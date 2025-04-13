import { generateState } from "arctic";
import { cookies } from "next/headers";

import { env } from "@/env";
import { discord } from "@/services/auth/discord";

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
