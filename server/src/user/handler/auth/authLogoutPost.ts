import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import { sessionCookieSet } from "../../../session/sessionCookieSet.js";

export const authLogoutPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/auth/logout",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({
                example: "User logged out",
                description: "Message",
              }),
            }),
          },
        },
        description: "User created",
      },
    },
  });

  app.openapi(route, async (c) => {
    sessionCookieSet({
      c,
      cookie: SESSION_USER_COOKIE,
      value: "",
    });

    return c.json(
      {
        message: "User logged out",
      },
      200
    );
  });
};
