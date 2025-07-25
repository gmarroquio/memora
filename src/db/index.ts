import { drizzle } from "drizzle-orm/postgres-js";
import pg from "postgres";

const client = pg(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client });
