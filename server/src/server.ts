import { serve } from "@hono/node-server";
import { connectMongo } from "./mongo/connectMongo.js";
import { routes } from "./routes.js";

export const server = async () => {
  try {
    console.log("Connecting to database...");
    await connectMongo();
  } catch (err) {
    console.log("Could not connect to database", { err });
    throw err;
  }

  const api = routes();

  const port = 4003;
  console.log(`Server is running on http://localhost:${port}`);

  serve({
    fetch: api.fetch,
    port,
  });
};
