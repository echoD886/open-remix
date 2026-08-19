import { defineConfig } from 'drizzle-kit';
import { loadEnvFiles } from './src/lib/env';

loadEnvFiles();

const provider = process.env.DATABASE_PROVIDER || 'sqlite';
const postgresSchema = (process.env.DB_SCHEMA || 'public').trim();

function getPostgresUrl() {
  const url = process.env.DATABASE_URL;
  const schema = postgresSchema;

  if (!url) {
    throw new Error('DATABASE_URL is required when DATABASE_PROVIDER is postgresql.');
  }

  if (!schema || schema === 'public') {
    return url;
  }

  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(schema)) {
    throw new Error(`Invalid DB_SCHEMA value: ${schema}`);
  }

  const parsed = new URL(url);
  parsed.searchParams.set('options', `-c search_path=${schema},public`);
  return parsed.toString();
}

const dialectMap: Record<string, 'sqlite' | 'postgresql' | 'mysql' | 'turso'> = {
  sqlite: 'sqlite',
  postgres: 'postgresql',
  postgresql: 'postgresql',
  mysql: 'mysql',
  turso: 'turso',
};

const dialect = dialectMap[provider] || 'sqlite';
const schemaByDialect: Record<typeof dialect, string> = {
  sqlite: './src/config/db/schema.sqlite.ts',
  turso: './src/config/db/schema.sqlite.ts',
  postgresql: './src/config/db/schema.postgres.ts',
  mysql: './src/config/db/schema.mysql.ts',
};
const postgresMigrationSchema =
  dialect === 'postgresql' && postgresSchema && postgresSchema !== 'public'
    ? `drizzle_${postgresSchema}`
    : undefined;

// Turso is a remote libsql database: it needs an auth token in addition to the
// libsql:// URL. Other dialects (sqlite/postgres/mysql) use the URL alone.
const dbCredentials =
  dialect === 'turso'
    ? {
        url: process.env.DATABASE_URL || 'file:data/local.db',
        authToken: process.env.DATABASE_AUTH_TOKEN,
      }
    : dialect === 'postgresql'
      ? {
          url: getPostgresUrl(),
        }
    : {
        url: process.env.DATABASE_URL || 'file:data/local.db',
      };

export default defineConfig({
  // Committed templates are the production migration source of truth. schema.ts
  // remains the provider-selected, gitignored local working copy.
  schema: schemaByDialect[dialect],
  out: `./drizzle/${dialect}`,
  dialect,
  dbCredentials,
  ...(postgresMigrationSchema
    ? {
        migrations: {
          schema: postgresMigrationSchema,
        },
      }
    : {}),
});
