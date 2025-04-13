"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import client from "@/lib/api";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import type { FormState } from "@/types/form-state";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_TTL } from "@/utils/constants";

export const registerAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.fromEntries(formData);
	const validated = RegisterSchema.safeParse(values);
	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	const { data, error } = await client.POST("/api/auth/register", {
		body: { ...validated.data },
	});

	if (error) {
		return {
			message: error.message,
			success: false,
		};
	}

	const cookieStore = await cookies();
	cookieStore.set({
		name: SESSION_COOKIE_NAME,
		value: data.id,
		maxAge: SESSION_COOKIE_TTL,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	});

	redirect("/home");
};

export const loginAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.fromEntries(formData.entries());
	const validated = LoginSchema.safeParse(values);

	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	const { data, error } = await client.POST("/api/auth/login", {
		body: { ...validated.data },
		credentials: "include",
	});

	if (error) {
		return {
			message: error.message,
			success: false,
		};
	}

	const cookieStore = await cookies();
	cookieStore.set({
		name: SESSION_COOKIE_NAME,
		value: data.id,
		maxAge: SESSION_COOKIE_TTL,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	});

	redirect("/home");
};

export const signOutAction = async () => {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE_NAME);

	if (!sessionId?.value) {
		return { success: false, message: "You must be logged in to do that" };
	}

	await client.POST("/api/auth/logout", {
		params: {
			header: {
				momentum_session_id: sessionId.value,
			},
		},
		credentials: "include",
	});

	cookieStore.delete(SESSION_COOKIE_NAME);

	redirect("/");
};
