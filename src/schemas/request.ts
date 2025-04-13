import { z } from "@hono/zod-openapi";

export const SessionHeadersSchema = z
	.object({
		momentum_session_id: z.string(),
	})
	.openapi("Session Headers", {
		example: {
			momentum_session_id: "1234567890abcdef",
		},
	});
