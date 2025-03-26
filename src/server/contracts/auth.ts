import { NewUserSchema } from "@/schemas/user";
import { oc } from "@orpc/contract";

export const signUp = oc
	.route({
		method: "POST",
		path: "/auth/sign-up",
		summary: "Sign up a new user",
		tags: ["Authentication"],
	})
	.input(NewUserSchema);
