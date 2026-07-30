#![no_std]

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, Address, BytesN, Env};

/// An opt-in registry for report hashes. The scanner and report source stay off-chain.
#[contract]
pub struct ReviewRegistry;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum RegistryError {
    AlreadyRegistered = 1,
}

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
    ) -> Result<(), RegistryError> {
        reporter.require_auth();
        let key = DataKey::Report(report_hash.clone());
        if env.storage().persistent().has(&key) {
            return Err(RegistryError::AlreadyRegistered);
        }
        let record = ReportRecord {
            reporter,
            contract_hash,
            created_at: env.ledger().timestamp(),
        };
        env.storage().persistent().set(&key, &record);
        Ok(())
    }

    pub fn get(env: Env, report_hash: BytesN<32>) -> Option<ReportRecord> {
        env.storage().persistent().get(&DataKey::Report(report_hash))
    }
}

#[cfg(test)]
mod test {
    extern crate std;

    use super::*;
    use soroban_sdk::testutils::Address as _;

    fn hash(env: &Env, byte: u8) -> BytesN<32> {
        BytesN::from_array(env, &[byte; 32])
    }

    #[test]
    fn registers_and_reads_a_hash_only_record() {
        let env = Env::default();
        env.mock_all_auths();
        let id = env.register_contract(None, ReviewRegistry);
        let client = ReviewRegistryClient::new(&env, &id);
        let reporter = Address::generate(&env);
        let report_hash = hash(&env, 7);
        let contract_hash = hash(&env, 9);

        assert_eq!(client.register(&reporter, &report_hash, &contract_hash), ());
        let record = client.get(&report_hash).unwrap();
        assert_eq!(record.reporter, reporter);
        assert_eq!(record.contract_hash, contract_hash);
    }

    #[test]
    fn prevents_duplicate_report_hashes() {
        let env = Env::default();
        env.mock_all_auths();
        let id = env.register_contract(None, ReviewRegistry);
        let client = ReviewRegistryClient::new(&env, &id);
        let reporter = Address::generate(&env);
        let report_hash = hash(&env, 1);
        let contract_hash = hash(&env, 2);

        client.register(&reporter, &report_hash, &contract_hash);
        assert_eq!(
            client.try_register(&reporter, &report_hash, &contract_hash),
            Err(Ok(RegistryError::AlreadyRegistered))
        );
    }
}
