import dotenvSafe from "dotenv-safe";
import path from "path";

const cwd = process.cwd();

const root = path.join.bind(cwd);

const getEnvFile = (): string => {
  if (process.env.ENV_FILE !== undefined) {
    return process.env.ENV_FILE;
  }

  return ".env";
};

const envFile = getEnvFile();

dotenvSafe.config({
  path: root(envFile),
  sample: root(".env.example"),
});

const { NODE_ENV, RABBITMQ_URL } = process.env;

export const config = {
  NODE_ENV,
  RABBITMQ_URL,
};
