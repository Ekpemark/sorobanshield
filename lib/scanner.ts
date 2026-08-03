export type Severity = "Critical" | "High" | "Medium" | "Low";

export type Finding = {
  id: string;
  severity: Severity;
  title: string;
  line: number;
  evidence: string;
  why: string;
  remediation: string;
};

export const rules = [
  {
    id: "SS-001",
    severity: "High" as Severity,
    title: "State-changing function lacks explicit authorization",
    test: (line: string) => /pub\s+fn\s+(set|update|withdraw|transfer|mint|burn|admin|_admin)[_\s(]/.test(line),
    why: "Soroban contracts must explicitly require authorization for privileged state changes.",
    remediation: "Require the expected actor's authorization before mutating state, e.g. `admin.require_auth()` or `user.require_auth()`."
  },
  {
    id: "SS-002",
    severity: "Medium" as Severity,
    title: "Persistent storage write detected",
    test: (line: string) => /storage\(\)\.persistent\(\)\.set/.test(line),
    why: "Persistent storage entries remain until explicitly removed and require key ownership and rent review.",
    remediation: "Document the key lifecycle, bound user-controlled keys, and use temporary storage when durability is not required."
  },
  {
    id: "SS-003",
    severity: "Medium" as Severity,
    title: "External contract invocation detected",
    test: (line: string) => /invoke_contract/.test(line),
    why: "Cross-contract calls change the threat boundary and should be made after input validation and authorization.",
    remediation: "Validate inputs and authorization first; avoid relying on mutable external state after the call."
  },
  {
    id: "SS-004",
    severity: "Low" as Severity,
    title: "Unchecked arithmetic pattern",
    test: (line: string) => /\s[+\-*\/]\s/.test(line) && !/checked_|saturating_|Symbol::new|Address::from_string|extend_ttl|symbol_short!/.test(line),
    why: "Arithmetic can panic or produce incorrect accounting when values approach type bounds.",
    remediation: "Use checked arithmetic (e.g., `checked_add`, `checked_sub`) and return a contract error on overflow."
  },
  {
    id: "SS-005",
    severity: "Medium" as Severity,
    title: "Persistent storage lacks explicit TTL extension",
    test: (line: string) => /storage\(\)\.persistent\(\)\.set/.test(line),
    why: "Soroban persistent storage entries expire if their Time-To-Live (TTL) is not extended, risking state lock.",
    remediation: "Extend storage TTL using `env.storage().persistent().extend_ttl(...)` to ensure long-term availability."
  },
  {
    id: "SS-006",
    severity: "High" as Severity,
    title: "Potential panic-inducing `unwrap()` or `expect()`",
    test: (line: string) => /\.(unwrap|expect)\(/.test(line),
    why: "Using `unwrap()` or `expect()` causes unhandled contract panics, reverting transactions without structured error codes.",
    remediation: "Handle `Option` or `Result` types explicitly and return custom Soroban `Error` enums."
  },
  {
    id: "SS-007",
    severity: "Medium" as Severity,
    title: "Hardcoded contract or account address",
    test: (line: string) => /Address::from_string/.test(line),
    why: "Hardcoding address strings in contract logic creates maintenance hazards and prevents testnet/mainnet flexibility.",
    remediation: "Pass external addresses as parameters during contract initialization or function calls."
  },
  {
    id: "SS-008",
    severity: "Low" as Severity,
    title: "Dynamic Symbol allocation in runtime",
    test: (line: string) => /Symbol::new\(/.test(line),
    why: "Allocating dynamic symbols repeatedly at runtime consumes extra CPU/gas units.",
    remediation: "Use static `symbol_short!(\"...\")` macro for predefined keys or reuse cached symbol identifiers."
  },
  {
    id: "SS-009",
    severity: "Low" as Severity,
    title: "Unauthenticated event emission pattern",
    test: (line: string) => /events\(\)\.publish/.test(line),
    why: "Publishing events without verifying caller authorization allows unauthenticated callers to emit misleading off-chain events.",
    remediation: "Ensure `require_auth()` is enforced before publishing events representing state mutations."
  },
  {
    id: "SS-010",
    severity: "High" as Severity,
    title: "Raw panic invocation in smart contract logic",
    test: (line: string) => /panic!\(/.test(line),
    why: "Explicit `panic!` calls halt contract execution abruptly without returning an explicit error code to clients.",
    remediation: "Replace `panic!` with returning a `Result<(), Error>` using contract error codes."
  }
];

export function scan(code: string): Finding[] {
  const lines = code.split("\n");
  return rules.flatMap(rule =>
    lines.flatMap((line, index) =>
      rule.test(line)
        ? [
            {
              id: rule.id,
              severity: rule.severity,
              title: rule.title,
              line: index + 1,
              evidence: line.trim() || "Matching code pattern",
              why: rule.why,
              remediation: rule.remediation
            }
          ]
        : []
    )
  );
}

export const contractTemplates = {
  unsafeVault: {
    name: "Unsafe Vault (Multiple Risks)",
    code: `#![no_std]
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
}`
  },
  defiRisk: {
    name: "DeFi Swap (Panic & Error Risk)",
    code: `#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Address, Symbol};

#[contract]
pub struct SwapPool;

#[contractimpl]
impl SwapPool {
    pub fn swap(env: Env, user: Address, token_in: i128, token_out: i128) {
        let ratio = token_out / token_in;
        if ratio == 0 {
            panic!("Invalid swap ratio");
        }
        let stored_val: i128 = env.storage().instance().get(&Symbol::new(&env, "pool")).unwrap();
        env.events().publish((Symbol::new(&env, "swap"),), ratio);
    }
}`
  },
  secureVault: {
    name: "Secure Vault (Clean Soroban Contract)",
    code: `#![no_std]
use soroban_sdk::{contract, contractimpl, contracterror, symbol_short, Address, Env};

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    Overflow = 1,
}

#[contract]
pub struct SecureVault;

#[contractimpl]
impl SecureVault {
    pub fn setup(env: Env, owner: Address) {
        owner.require_auth();
        env.storage().instance().set(&symbol_short!("owner"), &owner);
    }

    pub fn deposit(env: Env, from: Address, amount: i128) -> Result<(), Error> {
        from.require_auth();
        let current: i128 = env.storage().instance().get(&from).unwrap_or(0);
        let new_balance = current.checked_add(amount).ok_or(Error::Overflow)?;
        env.storage().instance().set(&from, &new_balance);
        Ok(())
    }
}`
  }
};

export const exampleContract = contractTemplates.unsafeVault.code;
