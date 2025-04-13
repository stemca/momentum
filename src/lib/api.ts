import createClient from "openapi-fetch";

import { env } from "@/env";
import type { paths } from "@/types/api";

const client = createClient<paths>({
	baseUrl: env.NEXT_PUBLIC_BASE_URL,
	credentials: "include",
});

export default client;
