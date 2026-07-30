import assert from "node:assert/strict";
import test from "node:test";
import { scan } from "./scanner.ts";

test("flags the MVP's four supported Soroban review points", () => {
  const findings = scan(`
pub fn set_admin(env: Env, admin: Address) {
  env.storage().persistent().set(&key, &admin);
  let next = amount - 1;
  env.invoke_contract::<()>(&target, &symbol, ());
}`);

  assert.deepEqual(findings.map(({ id }) => id), ["SS-001", "SS-002", "SS-003", "SS-004"]);
});

test("does not flag checked arithmetic", () => {
  const findings = scan("let next = amount.checked_sub(1);");
  assert.equal(findings.some(({ id }) => id === "SS-004"), false);
});
