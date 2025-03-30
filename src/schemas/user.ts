import { oz } from "@orpc/zod";
import { z } from "zod";

export type NewUser = z.infer<typeof NewUserSchema>;
export type User = z.infer<typeof UserSchema>;
export type SignInType = z.infer<typeof SignInSchema>;

export const NewUserSchema = oz.openapi(
	z.object({
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
	}),
	{
		examples: [
			{
				name: "John Doe",
				email: "john@doe.com",
				password: "123456",
			},
		],
	},
);

export const UserSchema = oz.openapi(
	z.object({
		id: z.string(),
		name: z.string(),
		email: z.string().email(),
	}),
	{
		examples: [
			{
				id: "1",
				name: "John Doe",
				email: "john@doe.com",
			},
		],
	},
);

export const SignInSchema = oz.openapi(
	z.object({
		email: z.string().email({ message: "Please enter a valid email." }).trim(),
		password: z.string(),
	}),
	{
		examples: [
			{
				email: "john.doe@gmail.com",
				password: "********",
			},
		],
	},
);

export const DiscordUserSchema = z.object({
	id: z.string(),
	username: z.string(),
	avatar: z.string(),
	email: z.string(),
	verified: z.boolean(),
});

export const ExistingUserSchema = UserSchema.pick({
	email: true,
});
