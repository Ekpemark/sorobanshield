# Superseded — do not submit this as written

This earlier SCF #45 Build Award draft is retained only as background. Based on the current SCF requirements and the supplied applicant profile, SorobanShield should use the $5,000 Instawards route first. Use [INSTAWARD_APPLICATION.md](INSTAWARD_APPLICATION.md) and [GRANT_REQUIREMENTS.md](GRANT_REQUIREMENTS.md) instead.

# Historical: SorobanShield — SCF #45 Build Award application draft

**Applicant / team:** LeyendaCodes  
**Primary role:** Developer  
**Relevant experience:** Rust development  
**Requested award:** **US$5,000 equivalent in XLM**  
**Track:** Open Track (confirm in the application portal)  
**Round:** SCF #45

> Replace bracketed fields before submission. Do not claim users, pilots, revenue, audit outcomes, or integrations that have not happened.

## One-line pitch

SorobanShield is an open, developer-first security and audit-preparation tool that helps Soroban Rust developers identify authorization, storage, cross-contract-call, and arithmetic risks before testnet or mainnet deployment.

## Problem

Soroban developers write production smart contracts in Rust, but generic smart-contract scanners are usually optimized for EVM/Solidity assumptions. Developers need security feedback that understands Soroban's explicit authorization model, instance/persistent/temporary storage choices, Rust arithmetic, and cross-contract invocation patterns. Without early feedback, small teams spend audit budget discovering basic issues late in the deployment cycle.

## Solution and MVP

SorobanShield provides a browser-based contract review workflow:

1. A developer pastes a Soroban Rust contract.
2. A deterministic Soroban-aware rule pack flags review points.
3. Each finding explains why it matters and gives a remediation direction.
4. The developer exports an audit-readiness report to attach to a pull request or share with an auditor.

The submitted MVP runs locally today and includes rules for privileged entry points, persistent storage writes, external contract invocation, and unchecked arithmetic patterns. The requested grant funds a properly tested open-source beta with a Soroban-specific ruleset, sample vulnerable contracts, and GitHub Actions integration.

## Why Stellar / Soroban

SorobanShield is only useful because it is purpose-built for Soroban. Its rules and educational output are grounded in Soroban SDK Rust conventions and cover areas that differ from EVM tooling:

- `require_auth` and explicit authorization review;
- `instance`, `persistent`, and `temporary` storage decisions and lifecycle;
- host-mediated cross-contract calls;
- Rust integer handling and contract error paths;
- testnet deployment and release workflow expectations for Soroban projects.

The project will be developed publicly, giving Stellar developers a reusable security baseline before engaging independent auditors.

## Differentiation

SorobanShield will not claim to replace audits or provide AI-only, opaque security verdicts. Its practical wedge is an **open deterministic Soroban rule pack plus developer-friendly CI and audit-readiness reports**. Every finding must link to a rule, source location, impact explanation, remediation, and test case. This makes it useful for hackathon teams and mature projects, and gives auditors a transparent starting point.

## Target users and validation plan

Initial users are independent Soroban developers, hackathon teams, open-source protocol maintainers, and auditors reviewing early Soroban projects.

Validation during the grant period:

- Publish the beta and ask for feedback in the Stellar developer community.
- Scan at least 10 open-source Soroban repositories, only with public code or author permission.
- Conduct 5 structured developer interviews and publish an anonymized findings/feedback summary.
- Track scan count, rule precision feedback, report exports, and GitHub Action installs without collecting contract source by default.

## Delivery plan and success criteria

### Tranche 1 — MVP hardening (US$2,000; weeks 1–4)

**Deliverables**

- Public repository with the current browser MVP and reproducible local setup.
- At least 10 documented Soroban-specific static rules covering authorization, storage, arithmetic, access control, and external-call review.
- A fixture suite with at least 20 intentionally vulnerable/safe code samples.
- CI that runs unit tests for every rule.

**Completion evidence**

- Public repository, tagged release, setup documentation, and test output.
- Rule catalogue mapping each rule to a finding explanation and remediation.

### Tranche 2 — Testnet developer workflow (US$1,750; weeks 5–8)

**Deliverables**

- GitHub Action that comments a Markdown/SARIF-compatible scan summary on pull requests.
- Versioned CLI or API interface that scans a local Soroban project without uploading source code.
- Testnet walkthrough that scans a sample contract before deployment.
- Five developer feedback interviews and a public summary of changes made.

**Completion evidence**

- Action and CLI documentation, example PR output, testnet demo video, and feedback summary.

### Tranche 3 — Public beta and audit-readiness reports (US$1,250; weeks 9–12)

**Deliverables**

- Hosted public beta with no-source-retention default.
- Professional Markdown/PDF-ready audit-preparation report.
- Public security knowledge base for supported rules and limitations.
- At least 10 public-code or permissioned projects scanned and a metrics/lessons-learned report.

**Completion evidence**

- Public beta URL, versioned report template, knowledge-base pages, and metrics report.

## Budget

| Category | Amount (USD equivalent) | Purpose |
|---|---:|---|
| Engineering and rule development | $3,000 | Scanner architecture, rule pack, fixtures, testing, CLI/Action |
| Infrastructure and developer tooling | $700 | Hosting, database/telemetry only if needed, CI, domain |
| Security validation | $800 | Independent review of rule quality and test cases |
| Documentation, demo, community testing | $500 | Knowledge base, demo, feedback sessions |
| **Total** | **$5,000** | |

No grant funds will be used for token issuance, trading, yield, or financial incentives.

## Technical architecture

The initial MVP is a Next.js/TypeScript browser application to minimize friction and retain code locally by default. The production scanner will move rule evaluation into a Rust/Node-compatible CLI, use structured source parsing where feasible, and emit JSON/SARIF for GitHub Actions. Optional user accounts and report persistence will be separate from scanning and opt-in. The initial data store, if introduced, is PostgreSQL/Supabase for account and report metadata—not private source code by default.

## Open-source and sustainability

The scanner rule pack, fixtures, CLI, and GitHub Action will be MIT or Apache-2.0 licensed (final choice to be made before public release). Sustainability comes from optional hosted team workspaces and premium audit-preparation/reporting workflows, while the core rule pack remains open for ecosystem value.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| False positives reduce trust | Version every rule, test positive and negative fixtures, show evidence and allow feedback. |
| Tool is mistaken for an audit | Prominent product and report disclaimers; recommend independent audits before mainnet. |
| Soroban SDK changes | Pin SDK versions, run fixtures in CI, publish compatibility matrix. |
| Solo-developer delivery risk | Small scope, milestone-first funding request, public weekly progress, narrow MVP. |
| Similar ecosystem tools emerge | Differentiate through open rules, local-first scanning, transparent CI output, and quick user feedback. |

## Application-ready answers

### What will be built?

An open Soroban contract security scanner and audit-preparation workflow: browser MVP, tested rule pack, local CLI/API, GitHub Action, reporting, and a public knowledge base.

### What is the expected ecosystem impact?

Soroban developers will get security feedback earlier and in their Rust workflow, reducing avoidable issues reaching testnet and professional audit. The open rule suite and fixtures will also provide shared educational infrastructure for the Stellar developer community.

### Why is the team able to deliver?

LeyendaCodes is led by a Rust developer. The proposal deliberately requests a small US$5,000 budget and defines observable, 12-week outputs that can be independently checked through public code, tests, release tags, documentation, and demo artifacts.

### How will success be measured?

Within 12 weeks: 10+ documented rules, 20+ test fixtures, one public GitHub Action, 10+ permissioned/public-code scans, five feedback interviews, and a public beta/release report. Quality is measured by reported false positives and rule feedback—not by unverified claims of vulnerabilities prevented.

## Submission checklist

- [ ] Submit the SCF #45 interest form as soon as possible.
- [ ] Create/verify the LeyendaCodes applicant profile and payout/KYC readiness as required by SCF.
- [ ] Replace bracketed facts with verified links: GitHub profile, project repository, demo URL, contact, jurisdiction, and portfolio.
- [ ] Add a 90–120 second screen-recorded demo of the local MVP scanning the included sample contract.
- [ ] Publish the repository before submission and include its URL.
- [ ] Read and confirm compliance with the current SCF Handbook and Official Rules.
- [ ] Do not represent the application as accepted until SCF confirms an award.
