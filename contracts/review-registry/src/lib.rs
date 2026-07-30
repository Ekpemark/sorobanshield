#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env};

/// An opt-in registry for report hashes. The scanner and report source stay off-chain.
#[contract]
pub struct ReviewRegistry;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Report(BytesN<32>),
}

#[contracttype]
#[derive(Clone)]
pub struct ReportRecord {
    pub reporter: Address,
    pub contract_hash: BytesN<32>,
    pub created_at: u64,
}

#[contractimpl]
impl ReviewRegistry {
    /// Stores a report hash once. The reporter must explicitly authorize publication.
    pub fn register(
        env: Env,
        reporter: Address,
        report_hash: BytesN<32>,
        contract_hash: BytesN<32>,
    ) {
        reporter.require_auth();
        let key = DataKey::Report(report_hash.clone());
        if env.storage().persistent().has(&key) {
            panic!("report hash already registered");
        }
        let record = ReportRecord {
            reporter,
            contract_hash,
            created_at: env.ledger().timestamp(),
        };
        env.storage().persistent().set(&key, &record);
    }

    pub fn get(env: Env, report_hash: BytesN<32>) -> Option<ReportRecord> {
        env.storage().persistent().get(&DataKey::Report(report_hash))
    }
}
