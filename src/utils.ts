import { AnyColumn, sql } from "drizzle-orm";

export const increment = (column: AnyColumn, increment: number) => {
  return sql`${column} + ${increment}`;
};
