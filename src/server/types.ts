import type { Session, User } from "@/services/database/schemas";

export type ContextVariables = {
	user: User | null;
	session: Session | null;
};
