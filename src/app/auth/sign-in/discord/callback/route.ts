import type { OAuth2Tokens } from "arctic";
import { OAuth2RequestError, decodeIdToken } from "arctic";
import { cookies } from "next/headers";

import { DiscordUserSchema } from "@/schemas/user";
import { discord } from "@/services/auth/discord";
import { createSession, generateSessionToken } from "@/services/auth/session";
import { db } from "@/services/database";
import { accounts, users } from "@/services/database/schemas";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const cookieStore = await cookies();
	const storedState = cookieStore.get("discord_oauth_state")?.value ?? null;

	if (code === null || state === null || storedState === null) {
		return new Response(null, { status: 400 });
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await discord.validateAuthorizationCode(code, null);
	} catch (error) {
		if (error instanceof OAuth2RequestError) {
			return new Response(null, {
				status: Number.parseInt(error.code),
			});
		}
		return new Response(null, {
			status: 400,
		});
	}

	const accessToken = tokens.accessToken();

	const response = await fetch("https://discord.com/api/users/@me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const user = await response.json();
	const discordUser = DiscordUserSchema.safeParse(user);
	if (!discordUser.success) {
		return new Response(null, {
			status: 400,
		});
	}

	// accounts.accountId: user.id
	// providerId: "discord"
	// users.email: user.email
	// users.emailVerified: user.verified
	// create a transaction to create a user and an account object
	// if there is an existing user, link automatically
	// if there is no user, create a new account

	// first check if the user exists in the users and account table
	const existingAccount = await db.query.accounts.findFirst({
		where: and(
			eq(accounts.providerId, "discord"),
			eq(accounts.accountId, discordUser.data.id),
		),
	});
	if (existingAccount) {
		// the user exists and is authenticated, issue a session and redirect to /home
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingAccount.userId);

		cookieStore.set({
			name: "momentum_session",
			value: session.id,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
		});

		(await cookies()).delete("discord_oauth_state");

		return new Response(null, { status: 302, headers: { Location: "/home" } });
	}

	// there is no existing account, we should check for a user now
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, discordUser.data.email),
	});
	if (existingUser) {
		// the user exists, we should link the account to the existing user and issue a session
		await db.insert(accounts).values({
			accountId: discordUser.data.id,
			userId: existingUser.id,
			providerId: "discord",
		});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);

		cookieStore.set({
			name: "momentum_session",
			value: session.id,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
		});

		(await cookies()).delete("discord_oauth_state");

		return new Response(null, { status: 302, headers: { Location: "/home" } });
	}

	// clear cookie store
	(await cookies()).delete("discord_oauth_state");

	return new Response(null, { status: 302, headers: { Location: "/home" } });
}
