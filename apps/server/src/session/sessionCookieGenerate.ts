import { config } from "../config.js";
import jwt from "jsonwebtoken";

export const sessionCookieGenerate = (id: string, scope: string) =>
  jwt.sign(
    {
      id,
      scope,
    },
    config.JWT_SECRET!
  );
