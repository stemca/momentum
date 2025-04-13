import { OpenAPIHono } from "@hono/zod-openapi";

import type { ContextVariables } from "@/server/types";
import { login } from "./login";
import { logout } from "./logout";
import { register } from "./register";

export const authRoutes = new OpenAPIHono<{
	Variables: ContextVariables;
}>();

authRoutes.route("/", login);
authRoutes.route("/", register);
authRoutes.route("/", logout);
