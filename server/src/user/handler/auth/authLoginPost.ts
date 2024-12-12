import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { Env } from "hono";
import { compareSync } from "bcrypt";
import { sessionCookieGenerate } from "../../../session/sessionCookieGenerate.js";
import { SESSION_USER_COOKIE } from "../../../session/sessionUserCookie.js";
import { sessionCookieSet } from "../../../session/sessionCookieSet.js";
import { UserModel } from "../../userModel.js";

export const authLoginPost = (app: OpenAPIHono<Env, {}, "/">) => {
  const route = createRoute({
    method: "post",
    path: "/auth/login",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
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
        description: "Login a user",
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
                example: "Identifier or password is incorrect",
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
    const { email, password } = c.req.valid("json");

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return c.json(
        {
          error: "Identifier or password is incorrect",
        },
        400
      );
    }

    if (!compareSync(password, user.password)) {
      return c.json(
        {
          error: "Identifier or password is incorrect",
        },
        400
      );
    }

    const userToken = sessionCookieGenerate(
      user._id?.toString(),
      SESSION_USER_COOKIE
    );

    sessionCookieSet({
      c,
      cookie: SESSION_USER_COOKIE,
      value: userToken,
    });

    return c.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      200
    );
  });
};
