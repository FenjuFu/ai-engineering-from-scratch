import { pathToFileURL } from "node:url";
import path from "node:path";

export function parseJSON(raw: string): unknown {
  throw new Error("Not implemented: parseJSON");
}
export function validate(value: unknown, schema: unknown): unknown[] {
  throw new Error("Not implemented: validate");
}
export function guard(raw: string, schema: unknown): unknown {
  throw new Error("Not implemented: guard");
}
export async function repair(...args: unknown[]): Promise<unknown> {
  throw new Error("Not implemented: repair");
}
