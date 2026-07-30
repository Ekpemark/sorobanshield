# SorobanShield

SorobanShield is an open, local-first security and audit-preparation MVP for Soroban Rust contracts on Stellar. It gives developers fast, explainable review points for authorization, storage, cross-contract calls, and arithmetic before testnet or mainnet deployment.

> **Security notice:** SorobanShield is audit preparation tooling, not a professional security audit or a guarantee that a contract is safe.

## Run locally

Prerequisite: Node.js 20+.

```powershell
npm.cmd install
npm.cmd run dev
```

Then open [http://localhost:3000](http://localhost:3000). The app works fully in-browser: paste a Soroban Rust contract, run the heuristic scan, and download a Markdown security report.

## Current MVP coverage

- Privileged state-changing entry points that need explicit authorization review
- Persistent-storage lifecycle risks
- Cross-contract call review points
- Arithmetic operations that should use checked arithmetic
- Human-readable remediation and exportable audit-readiness reports

## Grant-ready project evidence

- [Instaward request draft](docs/INSTAWARD_APPLICATION.md)
- [Eligibility and submission checklist](docs/GRANT_REQUIREMENTS.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)

The current scope is an execution-ready 30-day Instaward sprint. It does not claim users, audits, integrations, or vulnerability prevention outcomes that have not yet been independently verified.

## Next milestones

See [docs/GRANT_REQUIREMENTS.md](docs/GRANT_REQUIREMENTS.md) for the current SCF eligibility check and [docs/INSTAWARD_APPLICATION.md](docs/INSTAWARD_APPLICATION.md) for the $5,000, 30-day request. The public grant landing page is available at `/grant`.
