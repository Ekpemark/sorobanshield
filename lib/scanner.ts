export type Severity = "Critical" | "High" | "Medium" | "Low";
export type Finding = {
  id: string; severity: Severity; title: string; line: number; evidence: string; why: string; remediation: string;
};

const rules = [
  {
    id: "SS-001", severity: "High" as Severity, title: "State-changing function lacks explicit authorization",
    test: (line: string) => /pub\s+fn\s+(set|update|withdraw|transfer|mint|burn|admin)/.test(line),
    why: "Soroban contracts must explicitly require authorization for privileged state changes.",
    remediation: "Require the expected actor's authorization before mutating state, e.g. `admin.require_auth()` or `user.require_auth()`."
  },
  {
    id: "SS-002", severity: "Medium" as Severity, title: "Persistent storage write detected",
    test: (line: string) => /storage\(\)\.persistent\(\)\.set/.test(line),
    why: "Persistent entries remain until explicitly removed and can create rent or lifecycle risks.",
    remediation: "Document the key lifecycle, bound user-controlled keys, and use temporary storage when durability is not required."
  },
  {
    id: "SS-003", severity: "Medium" as Severity, title: "External contract invocation detected",
    test: (line: string) => /invoke_contract/.test(line),
    why: "Cross-contract calls change the threat boundary and should be made after validation and authorization.",
    remediation: "Validate inputs and authorization first; avoid relying on mutable external state after the call."
  },
  {
    id: "SS-004", severity: "Low" as Severity, title: "Unchecked arithmetic pattern",
    test: (line: string) => /\s[+\-*]\s/.test(line) && !/checked_|saturating_/.test(line),
    why: "Arithmetic can panic or produce incorrect accounting when values approach type bounds.",
    remediation: "Use checked arithmetic and return a contract error on overflow or underflow."
  }
];

export function scan(code: string): Finding[] {
  const lines = code.split("\n");
  return rules.flatMap(rule => lines.flatMap((line, index) => rule.test(line) ? [{
    id: rule.id, severity: rule.severity, title: rule.title, line: index + 1,
    evidence: line.trim() || "Matching code pattern", why: rule.why, remediation: rule.remediation
  }] : []));
}

export const exampleContract = `#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, Symbol};

#[contract]
pub struct Vault;

#[contractimpl]
impl Vault {
    pub fn set_admin(env: Env, admin: Address) {
        env.storage().persistent().set(&Symbol::new(&env, "admin"), &admin);
    }

    pub fn withdraw(env: Env, amount: i128) {
        let next_balance = amount - 1;
        env.invoke_contract::<()>(&Address::from_string(&String::from_str(&env, "C...")), &Symbol::new(&env, "send"), ());
    }
}`;
