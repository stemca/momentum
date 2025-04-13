import { pgEnum, pgTable, real, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { timestamps } from "../timestamps";
import { users } from "./user";

export const weightUnitEnum = pgEnum("weight_unit", ["kg", "lbs"]);
export const heightUnitEnum = pgEnum("height_unit", ["cm", "in"]);

// all of these fields are optional
export const userInfos = pgTable("user_infos", {
	userId: uuid("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	weight: real("weight"), // User's weight (e.g., in kg or lbs)
	weightUnit: weightUnitEnum().notNull().default("lbs"),
	height: real("height"), // User's height (e.g., in cm or inches)
	heightUnit: heightUnitEnum().notNull().default("in"),
	profilePicture: varchar("profile_picture"), // URL/path to profile picture, could point to discord or google avatars
	birthdate: varchar("birthdate"), // Date of birth for the user
	gender: varchar("gender"), // Optional: Gender of the user
	...timestamps,
});

export type UserInfo = typeof userInfos.$inferInsert;
export type SelectUserInfo = typeof userInfos.$inferSelect;

export const CreateUserInfoSchema = createInsertSchema(userInfos);
export const SelectUserInfoSchema = createSelectSchema(userInfos);
