"use server";

import { ORPCError } from "@orpc/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { NewUserSchema, SignInSchema } from "@/schemas/user";
import { signIn, signOut, signUp } from "@/server/routers/auth";
import type { FormState } from "@/types/form-state";
import { revalidatePath } from "next/cache";

export const signUpAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.fromEntries(formData.entries());
	const validated = NewUserSchema.safeParse(values);

	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	try {
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
	} catch (error) {
		if (error instanceof ORPCError) {
			return { message: error.message, success: false };
		}

		return { message: "Something went wrong", success: false };
	}

	redirect("/home");
};

export const signInAction = async (
	_: unknown,
	formData: FormData,
): Promise<FormState> => {
	const values = Object.fromEntries(formData.entries());
	const validated = SignInSchema.safeParse(values);

	if (!validated.success) {
		return { message: "Invalid form data", success: false };
	}

	try {
		const { id } = await signIn({ ...validated.data });

		const cookieStore = await cookies();
		cookieStore.set({
			name: "momentum_session",
			value: id,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
		});
	} catch (error) {
		if (error instanceof ORPCError) {
			return { message: error.message, success: false };
		}

		return { message: "Something went wrong", success: false };
	}

	redirect("/home");
};

export const signOutAction = async () => {
	await signOut();

	const cookieStore = await cookies();
	cookieStore.delete("momentum_session");

	revalidatePath("/home");
};
