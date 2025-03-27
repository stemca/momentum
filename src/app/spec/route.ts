import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";

import { router } from "@/server/routers";

const openAPIGenerator = new OpenAPIGenerator({
  schemaConverters: [new ZodToJsonSchemaConverter()],
});

export async function GET(request: Request) {
  const spec = await openAPIGenerator.generate(router, {
    info: {
      title: "Momentum OpenAPI Spec",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }],
    security: [{ bearerAuth: [] }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  });

  return new Response(JSON.stringify(spec), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
