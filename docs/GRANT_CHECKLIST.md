# SorobanShield grant-readiness checklist

**Last reviewed:** 2026-07-30

## Complete repository evidence

- [x] Public GitHub repository, README, MIT license, contribution guide, and security policy.
- [x] Architecture diagram, problem statement, solution overview, Soroban rationale, smart-contract design, security model, technical specification, and API contract: [ARCHITECTURE.md](ARCHITECTURE.md).
- [x] 30-day scope, three-month roadmap, milestones, deliverables, and budget: [ROADMAP.md](ROADMAP.md).
- [x] Threat model and audit-preparation process: [THREAT_MODEL.md](THREAT_MODEL.md).
- [x] Scanner unit tests (`npm.cmd run test`) and type/build checks.
- [x] Initial vulnerability database: [VULNERABILITY_DATABASE.md](VULNERABILITY_DATABASE.md).
- [x] Browser landing page, interactive scan results/report viewer, and report generation.
- [x] Soroban review-registry contract source, tested and compiled for `wasm32v1-none`.
- [x] Executive summary, budget, team information, deliverables, and pitch-deck copy: [SCF_SUBMISSION_PACKET.md](SCF_SUBMISSION_PACKET.md), [PITCH_DECK.md](PITCH_DECK.md).
- [x] Demo recording and screenshot walkthrough: [DEMO_WALKTHROUGH.md](DEMO_WALKTHROUGH.md).

## Required external proof — must not be fabricated

- [ ] Publish a live website URL (requires deployment-account access).
- [ ] Deploy the reviewed registry contract to Stellar testnet (requires an account, testnet funding, and a deliberate deployment approval).
- [ ] Record a real 3–5 minute product and testnet video.
- [ ] Capture real screenshots after deployment and place them in `docs/screenshots/`.
- [ ] Create a Stellar Developer Discord account, participate in community discussions, and engage with the appropriate Ambassador Chapter.
- [ ] Complete Stellar Quest and Soroban Quest under your own account.
- [ ] Add a wallet connection only after selecting the supported wallet, privacy policy, and testnet user flow.

## Deliberate product-scope decisions

- The vulnerability scanner is off-chain because source analysis is inappropriate for a smart contract.
- The current Soroban contract is an opt-in, hash-only review registry—not a source-code or full-report store.
- Reputation scoring, hosted authentication, and an OpenAI-backed review service are deferred until there is validated demand and explicit data/privacy design. They are not represented as completed functionality.
