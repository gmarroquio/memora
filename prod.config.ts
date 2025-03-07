import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.PROD_TURSO_CONNECTION_URL!,
    authToken: process.env.PROD_TURSO_AUTH_TOKEN!,
  },
});
