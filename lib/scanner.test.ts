import assert from "node:assert/strict";
import test from "node:test";
import { contractTemplates, scan } from "./scanner.ts";

test("flags Soroban review points on unsafe contract template", () => {
  const findings = scan(contractTemplates.unsafeVault.code);
  const ruleIds = findings.map(({ id }) => id);

  assert.ok(ruleIds.includes("SS-001"));
  assert.ok(ruleIds.includes("SS-002"));
  assert.ok(ruleIds.includes("SS-003"));
  assert.ok(ruleIds.includes("SS-004"));
  assert.ok(ruleIds.includes("SS-005"));
  assert.ok(ruleIds.includes("SS-007"));
  assert.ok(ruleIds.includes("SS-008"));
});

test("flags panic and unwrap risks on DeFi contract template", () => {
  const findings = scan(contractTemplates.defiRisk.code);
  const ruleIds = findings.map(({ id }) => id);

  assert.ok(ruleIds.includes("SS-004"));
  assert.ok(ruleIds.includes("SS-006"));
  assert.ok(ruleIds.includes("SS-008"));
  assert.ok(ruleIds.includes("SS-009"));
  assert.ok(ruleIds.includes("SS-010"));
});

test("does not flag clean/secure contract template", () => {
  const findings = scan(contractTemplates.secureVault.code);
  assert.equal(findings.length, 0);
});

test("does not flag checked arithmetic", () => {
  const findings = scan("let next = amount.checked_sub(1);");
  assert.equal(findings.some(({ id }) => id === "SS-004"), false);
});
