import { signIn, signOut, signUp } from "./auth";

export const router = {
	auth: {
		signUp,
		signIn,
		signOut,
	},
};
