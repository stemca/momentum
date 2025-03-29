import type { db } from "@/services/database";
import type { Session, User } from "@/services/database/schemas";

export type DbContextType = {
	db?: typeof db;
};

export type AuthContextType = {
	user?: User;
	session?: Session;
};
