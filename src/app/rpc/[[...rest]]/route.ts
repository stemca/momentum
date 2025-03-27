import { onError } from "@orpc/server";
import { RPCHandler, serve } from "@orpc/server/next";

import { router } from "@/server/routers";

const rpcHandler = new RPCHandler(router, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const { GET, POST, PUT, PATCH, DELETE } = serve(rpcHandler, {
	prefix: "/rpc",
	context: async (req) => {
		// TODO: grab user from session
		return {};
	},
});
