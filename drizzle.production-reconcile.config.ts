import { defineConfig } from 'drizzle-kit';
import { loadEnvFiles } from './src/lib/env';

loadEnvFiles();

const databaseUrl = process.env.DATABASE_URL;
const databaseSchema = (process.env.DB_SCHEMA || 'public').trim();

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required for production reconciliation.');
}
if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(databaseSchema)) {
  throw new Error(`Invalid DB_SCHEMA value: ${databaseSchema}`);
}

const parsed = new URL(databaseUrl);
if (databaseSchema !== 'public') {
  parsed.searchParams.set('options', `-c search_path=${databaseSchema},public`);
}

export default defineConfig({
  schema: './src/config/db/schema.postgres.ts',
  out: './drizzle/production-image-bootstrap',
  dialect: 'postgresql',
  dbCredentials: { url: parsed.toString() },
  ...(databaseSchema === 'public'
    ? {}
    : { migrations: { schema: `drizzle_${databaseSchema}` } }),
});
