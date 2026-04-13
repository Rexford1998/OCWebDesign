import * as schema from './schema';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
});
