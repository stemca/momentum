import { os } from "@orpc/server";

import { dbProviderMiddleware } from "./middlewares/db";

export const pub = os.use(dbProviderMiddleware);

// pub: use db middleware
// authed: extend pub and use auth middleware
