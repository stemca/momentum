import type { OAuth2Tokens } from "arctic";
import { OAuth2RequestError } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { DiscordUserSchema } from "@/schemas/user";
import { discord } from "@/services/auth/discord";
import { createSession, generateSessionToken } from "@/services/auth/session";
import { db } from "@/services/database";
import { accounts, users } from "@/services/database/schemas";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	// Handle cookieStore upfront
	const cookieStore = await cookies();
	const storedState = cookieStore.get("discord_oauth_state")?.value ?? null;

	if (code === null || state === null || storedState === null) {
		console.log("Invalid request parameters", { code, state, storedState });
		return new Response("Invalid request parameters", { status: 400 });
	}

	if (state !== storedState) {
		console.log("State does not match stored state", { state, storedState });
		return new Response("State mismatch", { status: 400 });
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await discord.validateAuthorizationCode(code, null);
	} catch (error) {
		console.error("Error validating authorization code", error);
		if (error instanceof OAuth2RequestError) {
			return new Response("OAuth2 error", {
				status: Number.parseInt(error.code),
			});
		}
		return new Response("Failed to validate authorization code", {
			status: 400,
		});
	}

	const accessToken = tokens.accessToken();

	// Fetch Discord user data
	const response = await fetch("https://discord.com/api/users/@me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const user = await response.json();
	const discordUser = DiscordUserSchema.safeParse(user);
	if (!discordUser.success) {
		console.log("Invalid Discord user data", discordUser.error);
		return new Response("Invalid Discord user data", { status: 400 });
	}

	// Check if account exists with Discord ID
	const existingAccount = await db.query.accounts.findFirst({
		where: and(
			eq(accounts.providerId, "discord"),
			eq(accounts.accountId, discordUser.data.id),
		),
	});
	if (existingAccount) {
		console.log("Existing account found for user", existingAccount.userId);
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
		await cookieStore.delete("discord_oauth_state");

		return new Response(null, { status: 302, headers: { Location: "/home" } });
	}

	// Check if user exists with the same email (to link account)
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, discordUser.data.email),
	});
	if (existingUser) {
		console.log("User exists, linking Discord account", existingUser.id);
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
		await cookieStore.delete("discord_oauth_state");

		return new Response(null, { status: 302, headers: { Location: "/home" } });
	}

	// Create a new user and account if no existing user
	console.log("Creating new user");
	const newUser = await db
		.insert(users)
		.values({
			email: discordUser.data.email,
			name: discordUser.data.username,
		})
		.returning();

	if (newUser.length < 1) {
		console.log("Failed to create new user");
		return new Response("Failed to create user", { status: 500 });
	}

	await db.insert(accounts).values({
		accountId: discordUser.data.id,
		userId: newUser[0].id,
		providerId: "discord",
	});

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, newUser[0].id);

	cookieStore.set({
		name: "momentum_session",
		value: session.id,
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
	});
	await cookieStore.delete("discord_oauth_state");

	return new Response(null, { status: 302, headers: { Location: "/home" } });
}
