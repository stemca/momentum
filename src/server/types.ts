import type { db } from "@/services/db";
import type { Session, User } from "@/services/db/schemas";

export type ContextVariables = {
	session: Session | null;
	user: User | null;
	db: typeof db;
};
