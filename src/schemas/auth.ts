import { z } from "@hono/zod-openapi";

export const LoginSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(1, { message: "Password can not be empty." }),
	})
	.openapi("login", {
		example: {
			email: "user@example.com",
			password: "password",
		},
	});

export const RegisterSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: "Name must be at least 2 characters long." })
			.trim(),
		email: z.string().email({ message: "Please enter a valid email." }).trim(),
		password: z
			.string()
			.min(8, { message: "Be at least 8 characters long" })
			.regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
			.regex(/[0-9]/, { message: "Contain at least one number." })
			.regex(/[^a-zA-Z0-9]/, {
				message: "Contain at least one special character.",
			})
			.trim(),
	})
	.openapi("register", {
		example: {
			name: "John Doe",
			email: "user@example.com",
			password: "password",
		},
	});

export const DiscordUserSchema = z.object({
	id: z.string(),
	username: z.string(),
	avatar: z.string(),
	email: z.string(),
	verified: z.boolean(),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
export type SessionType = z.infer<typeof SessionSchema>;
