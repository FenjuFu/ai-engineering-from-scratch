import { pathToFileURL } from "node:url";
import path from "node:path";

export function parseObservation(...args: unknown[]): any {
  throw new Error("Not implemented: parseObservation");
}
export function choose(...args: unknown[]): any {
  throw new Error("Not implemented: choose");
}
export function inspectPNG(...args: unknown[]): any {
  throw new Error("Not implemented: inspectPNG");
}
export async function runAgent(...args: unknown[]): Promise<any> {
  throw new Error("Not implemented: runAgent");
}
export class FixtureDriver {
  constructor(...args: unknown[]) {}
}
export class GstackDriver {
  constructor(...args: unknown[]) {}
  async observe(): Promise<any> {
    throw new Error("Not implemented: observe");
  }
  async act(...args: unknown[]): Promise<void> {
    throw new Error("Not implemented: act");
  }
  async capture(): Promise<string> {
    throw new Error("Not implemented: capture");
  }
}
export function scoreRuns(...args: unknown[]): any {
  throw new Error("Not implemented: scoreRuns");
}
