import type { Session, User } from "@/services/database/schemas";
import type { db } from "@/services/database";

export type DbContextType = {
	db?: typeof db;
};

export type AuthContextType = DbContextType & {
	user?: User;
	session?: Session;
};
