import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { userCreate } from "../../userCreate.js";
import { hashSync } from "bcrypt";
import { sessionCookieGenerate } from "../../../session/sessionCookieGenerate.js";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import { sessionCookieSet } from "../../../session/sessionCookieSet.js";

export const authRegisterPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/auth/register",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              name: z.string({ message: "Name is required" }).openapi({
                example: "John Due",
                description: "Name of the user",
              }),
              email: z
                .string({ message: "Email is required" })
                .email({ message: "Email is invalid" })
                .transform((v) => v.toLowerCase())
                .openapi({
                  example: "user@mail.com",
                  description: "Email of the user",
                }),
              password: z
                .string({ message: "Password is required" })
                .min(6, "Password must be at least 6 characters")
                .openapi({
                  example: "password",
                  description: "Password of the user",
                }),
            }),
          },
        },
        description: "Register as a user",
        required: true,
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              _id: z.string().openapi({
                example: "123",
                description: "Id of the user",
              }),
              name: z.string().openapi({
                example: "John Due",
                description: "Name of the user",
              }),
              email: z.string().email().openapi({
                example: "user@mail.com",
                description: "Email of the user",
              }),
              createdAt: z.string().openapi({
                example: "2021-07-01T00:00:00.000Z",
                description: "Date of creation",
              }),
            }),
          },
        },
        description: "User created",
      },
      400: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string().openapi({
                example: "User already exists",
                description: "Error message",
              }),
            }),
          },
        },
        description: "Error creating user",
      },
    },
  });

  app.openapi(route, async (c) => {
    const { name, email, password } = c.req.valid("json");

    const userCreateResponse = await userCreate({
      name,
      email,
      password: hashSync(password, 10),
    });

    if (!userCreateResponse.success) {
      return c.json(
        {
          error: userCreateResponse.error,
        },
        400
      );
    }

    const { user } = userCreateResponse;

    const userToken = sessionCookieGenerate(
      user._id?.toString(),
      SESSION_USER_COOKIE
    );

    sessionCookieSet({
      c,
      cookie: SESSION_USER_COOKIE,
      value: userToken,
    });

    return c.json(user, 200);
  });
};
