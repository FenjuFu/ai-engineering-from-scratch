import { pathToFileURL } from "node:url";
import path from "node:path";

export function validateMemory(...args: unknown[]): any {
  throw new Error("Not implemented: validateMemory");
}
export function embed(...args: unknown[]): number[] {
  throw new Error("Not implemented: embed");
}
export function cosineScores(...args: unknown[]): number[] {
  throw new Error("Not implemented: cosineScores");
}
export class MemoryStore {
  constructor(...args: unknown[]) {}
  async put(...args: unknown[]): Promise<any> {
    throw new Error("Not implemented: put");
  }
  async list(...args: unknown[]): Promise<any[]> {
    throw new Error("Not implemented: list");
  }
  async search(...args: unknown[]): Promise<any[]> {
    throw new Error("Not implemented: search");
  }
}
export function createMemoryServer(...args: unknown[]): any {
  throw new Error("Not implemented: createMemoryServer");
}
