import type { OpenAPIHono } from "@hono/zod-openapi";
import { meGet } from "./meGet.js";
import type { Env } from "hono";

export const userRoutes = (app: OpenAPIHono<Env, {}, "/">) => {
  meGet(app);
};
