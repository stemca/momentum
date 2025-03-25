import type { db } from "@/services/database";
import type { Session, User } from "@/services/database/schemas";

export type ContextVariables = {
	db: typeof db;
	user: User | null;
	session: Session | null;
};
