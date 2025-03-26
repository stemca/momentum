import { pub } from "../orpc";

export const signUp = pub.auth.signUp.handler(async ({ input, context }) => {
	// sign up logic
});
