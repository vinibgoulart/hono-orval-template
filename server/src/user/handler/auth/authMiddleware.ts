import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "hono";
import { getCookie } from "hono/cookie";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import jwt from "jsonwebtoken";
import { config } from "../../../config.js";
import { getObjectId } from "../../../mongo/getObjectId.js";
import { UserModel } from "../../userModel.js";

export const authMiddleware = (app: OpenAPIHono<Env, {}, "/">) => {
  app.use("/*", async (c, next) => {
    const userToken = getCookie(c, SESSION_USER_COOKIE);

    if (!userToken) {
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );
    }

    const jwtDecoded = jwt.verify(userToken, config.JWT_SECRET!);

    if (typeof jwtDecoded !== "object" || !jwtDecoded?.id) {
      return c.json(
        {
          message: "Unauthorized",
        },
        401
      );
    }

    const userId = jwtDecoded.id;

    const user = await UserModel.findOne({
      _id: getObjectId(userId),
    });

    c.set("User", user);

    await next();
  });
};
