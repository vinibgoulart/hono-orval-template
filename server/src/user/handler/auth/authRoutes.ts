import type { Env } from "hono";
import type { OpenAPIHono } from "@hono/zod-openapi";
import { authRegisterPost } from "./authRegisterPost.js";
import { authLoginPost } from "./authLoginPost.js";
import { authLogoutPost } from "./authLogoutPost.js";

export const authRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  authRegisterPost(app);
  authLoginPost(app);
  authLogoutPost(app);
};
