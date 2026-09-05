import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("./personalization.js", import.meta.url), "utf8");
const { validateName } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

test("names accept accents, spaces, apostrophes and hyphens", () => {
  for (const value of ["Jamie", "Anne-Marie", "O'Neil", "O’Neil", "José", "E\u0301lodie", "Mary Jane"]) assert.equal(validateName(value, true), "");
});

test("invalid input and length limits receive actionable errors", () => {
  for (const value of ["Jamie2", "Hello!", "🎄", "A_B"]) assert.match(validateName(value), /letters/);
  assert.equal(validateName("A".repeat(12)), "");
  assert.match(validateName("A".repeat(13)), /12 characters/);
  for (const value of ["", "   ", "--", "'"]) assert.match(validateName(value, true), /at least one letter/);
});
