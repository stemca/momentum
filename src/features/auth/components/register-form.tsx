"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/features/auth/actions";
import { RegisterSchema, type RegisterType } from "@/schemas/auth";
import type { FormState } from "@/types/form-state";

const initialState = {
	success: undefined,
	message: undefined,
} satisfies FormState;

export default function RegisterForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction, pending] = useActionState(
		registerAction,
		initialState,
	);

	const form = useForm<RegisterType>({
		resolver: zodResolver(RegisterSchema),
		mode: "onSubmit",
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (state?.success === false) {
			toast.error(state.message);
		} else if (state?.success) {
			toast.success(state.message);
		}
	}, [state]);

	return (
		<Form {...form}>
			<form
				ref={formRef}
				onSubmit={(event) => {
					form.handleSubmit(() => {
						if (formRef.current) {
							const formData = new FormData(formRef.current);
							startTransition(() => {
								formAction(formData);
							});
						}
					})(event);
				}}
				className="flex w-full max-w-lg flex-col space-y-3"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" autoComplete="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input
									placeholder="example@email.com"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={pending}>
					Continue
				</Button>
			</form>
		</Form>
	);
}
