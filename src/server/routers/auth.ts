import { NewUserSchema } from "@/schemas/user";
import { users } from "@/services/database/schemas";
import { hashPassword } from "@/utils/password";
import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { pub } from "../clients";

export const signUp = pub
	.route({
		method: "POST",
		path: "/auth/sign-up",
		summary: "Sign up a new user",
		tags: ["authentication"],
	})
	.input(NewUserSchema)
	.handler(async ({ context, input }) => {
		// find existing user
		const existingUser = await context.db.query.users.findFirst({
			where: eq(users.email, input.email),
		});
		if (existingUser) {
			throw new ORPCError("CONFLICT", {
				message: "A user already exists with this email address",
			});
		}

		// create new user and hash password
		const hashedPassword = await hashPassword(input.password);

		const [user] = await context.db
			.insert(users)
			.values({
				...input,
				password: hashedPassword,
			})
			.returning();

		if (!user) {
			throw new ORPCError("INTERNAL_SERVER_ERROR", {
				message: "Failed to create user",
			});
		}
		return user;
	})
	.actionable();
