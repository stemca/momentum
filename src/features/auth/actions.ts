"use server";

import { cookies } from "next/headers";

import { NewUserSchema } from "@/schemas/user";
import { signUp } from "@/server/routers/auth";
import type { FormState } from "@/types/form-state";

export const signUpAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.fromEntries(formData.entries());
	const validated = NewUserSchema.safeParse(values);
	console.log(JSON.stringify(validated, null, 2));

	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	const { id } = await signUp({ ...validated.data });

	const cookieStore = await cookies();

	cookieStore.set({
		name: "momentum_session",
		value: id,
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		path: "/",
	});

	// revalidate path and redirect to verify-email
	return { message: "", success: true };
};
