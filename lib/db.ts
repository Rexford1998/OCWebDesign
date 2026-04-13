import * as schema from '../db/schema.ts';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
});
