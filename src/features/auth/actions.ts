"use server";
import { cookies } from "next/headers";

import { NewUserSchema } from "@/schemas/user";
import { signUp } from "@/server/routers/auth";
import type { FormState } from "@/types/form-state";

export const signUpAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.entries(formData.entries());
	const validated = NewUserSchema.safeParse(values);

	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	const { id, expiresAt } = await signUp({ ...validated.data });
	// store the session id in cookies
	const cookieStore = await cookies();

	cookieStore.set("momentum_session", id, {
		httpOnly: true,
		secure: true,
		expiresAt: expiresAt,
		sameSite: "lax",
		path: "/",
	});

	// revalidate path and redirect to verify-email
	return { message: "", success: true };
};
