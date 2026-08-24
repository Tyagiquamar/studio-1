/**
 * Migration 078: Add run_locally column to threads
 *
 * Historical schema for the retired "Run locally" thread choice. Current
 * runtime code does not read or write this column.
 *
 * It remains here because migrations describe the schema history; existing
 * values are intentionally left dirty rather than backfilled.
 */

import type { Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .alterTable("threads")
    .addColumn("run_locally", "boolean", (col) =>
      col.notNull().defaultTo(false),
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.alterTable("threads").dropColumn("run_locally").execute();
}
