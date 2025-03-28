import { oz } from "@orpc/zod";
import { z } from "zod";

export type Session = z.infer<typeof SessionSchema>;

export const SessionSchema = oz.openapi(
	z.object({
		id: z.string(),
		userId: z.string().cuid2(),
		expiresAt: z.date(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional().nullable(),
	}),
	{
		examples: [
			{
				id: "session-id",
				userId: "eye6o1y9qgbpi5gsu30wq0jt",
				expiresAt: new Date(),
			},
		],
	},
);
