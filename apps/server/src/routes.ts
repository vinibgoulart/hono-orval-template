import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "./user/handler/auth/authMiddleware.js";
import { authRoutes } from "./user/handler/auth/authRoutes.js";
import { userRoutes } from "./user/handler/userRoutes.js";
import { swaggerUI } from "@hono/swagger-ui";

export const routes = () => {
  const api = new OpenAPIHono();
  const app = new OpenAPIHono();
  const auth = new OpenAPIHono();

  authMiddleware(app);
  authRoutes(auth);
  userRoutes(app);

  api.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "crypto alert",
    },
  });

  api.get("/swagger", swaggerUI({ url: "/doc" }));

  api.route("/", auth);
  api.route("/", app);

  return api;
};
