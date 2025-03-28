"use client";
import { useActionState } from "react";

import type { FormState } from "@/types/form-state";
import { signUpAction } from "@/features/auth/actions";

const initialState = {
	success: false,
	message: undefined,
} satisfies FormState;

export default function SignUpForm() {
	const [state, formAction, pending] = useActionState(
		signUpAction,
		initialState,
	);

	return (
		<div className="h-full w-full">
			<h1>Create an account</h1>
		</div>
	);
}
