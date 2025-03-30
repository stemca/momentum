import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "../timestamps";
import { users } from "./user";

// all of these fields are optional
export const userInfos = sqliteTable("user_infos", {
	userId: text("user_id")
		.primaryKey()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	weight: real("weight"), // User's weight (e.g., in kg or lbs)
	weightUnit: text("weight_unit", { enum: ["kg", "lbs"] })
		.notNull()
		.default("lbs"),
	height: real("height"), // User's height (e.g., in cm or inches)
	heightUnit: text("height_unit", { enum: ["cm", "in"] })
		.notNull()
		.default("in"),
	profilePicture: text("profile_picture"), // URL/path to profile picture, could point to discord or google avatars
	birthdate: text("birthdate"), // Date of birth for the user
	gender: text("gender"), // Optional: Gender of the user
	...timestamps,
});

export type UserInfo = typeof userInfos.$inferInsert;
export type SelectUserInfo = typeof userInfos.$inferSelect;
