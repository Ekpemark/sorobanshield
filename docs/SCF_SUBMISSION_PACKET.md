# SorobanShield — SCF interest-form submission packet

Use this as the concise, truthful project description for the SCF interest form. It is designed for the current early-stage project state.

## Project name

SorobanShield

## Project URL

https://github.com/Ekpemark/sorobanshield

## Applicant

LeyendaCodes — Developer with Rust development experience.

## One-line description

An open, local-first security and audit-preparation tool that gives Soroban Rust developers explainable checks for authorization, storage, external calls, and arithmetic risks before deployment.

## What exists today

A public Next.js browser MVP that accepts a Soroban Rust source snippet, runs four deterministic heuristic checks locally, explains each finding, and exports a Markdown audit-readiness report. The repository includes reproducible setup instructions, an MIT license, a security policy, and an Instaward-ready scope.

## Why Stellar and Soroban

Generic contract scanners are commonly designed around Solidity and EVM assumptions. SorobanShield is focused on review points specific to Soroban’s Rust SDK and execution model: explicit address authorization, storage durability and lifecycle, host-mediated contract invocation, and safe integer handling. The core output is transparent evidence and remediation guidance—not an opaque AI verdict or a substitute for an independent audit.

## Proposed 30-day Instaward scope

1. Expand the rule pack from four MVP checks to at least ten documented Soroban-focused checks.
2. Publish at least twenty safe and intentionally vulnerable source fixtures with automated rule tests.
3. Improve source evidence and publish a local-first testnet-oriented walkthrough.
4. Release a tagged public beta, record a short demo, and collect five structured developer feedback sessions through the Stellar community.

## Completion evidence

- Public repository, release tag, and passing automated-test output.
- Rule catalogue and source fixtures linked from the repository.
- A short screen-recorded demo and testnet walkthrough.
- An anonymized summary of five feedback sessions and the resulting changes.

## Funding request

US$5,000 equivalent in XLM for a 30-day, clearly scoped execution sprint. This is intended as an Instaward request if SCF and the local Ambassador Chapter determine that route is appropriate.

## What we will not claim

No current users, audits, prevented exploits, GitHub Action, AI review, Rust CLI, testnet deployment, or mainnet integration are claimed unless independently verifiable at submission time.

## Applicant actions before submitting

1. Submit the interest form at https://communityfund.stellar.org/.
2. Join and consistently participate in the applicable Stellar Ambassador Chapter.
3. Share the repository, this scope, and a short product demo with the Chapter Lead.
4. Complete any SCF eligibility, compliance, identity, and tax steps only if requested by SDF.
