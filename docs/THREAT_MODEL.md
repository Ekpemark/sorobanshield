# SorobanShield threat model

## Assets to protect

- Developers' private contract source and report contents.
- Integrity of scanner rules, versions, and report artifacts.
- Project-owner control over any optional on-chain attestation.
- Users' understanding that the tool is not an audit.

## Threats and controls

| Threat | Risk | Control |
|---|---|---|
| Source disclosure | Private code is exposed through a hosted scanner | Local-first MVP; hosted retention must be opt-in; never put source on-chain |
| False negative | A real vulnerability is not flagged | Prominent audit limitation; versioned rules; fixtures and external review before mainnet use |
| False positive | Developers waste time or lose trust | Evidence, rule id, remediation, negative fixtures, and feedback loop |
| Report tampering | A reviewer cannot verify report provenance | Versioned scanner metadata and optional hash-only Soroban registry |
| Unauthorized registry entry | Someone submits a report in another person's name | `require_auth` on reporter address; immutable report hash key |
| Dependency compromise | Malicious package or rule update | Lockfiles, CI, pinned compatible SDK versions, code review, release tags |
| Misleading marketing | User treats a scan as a professional audit | Website/report disclaimers and no “secure” or “verified safe” claims |

## Audit-preparation process

1. Run the deterministic scanner locally.
2. Manually review each finding and its surrounding code.
3. Run contract unit and integration tests.
4. Deploy and exercise testnet contracts.
5. Share a versioned report and source commit with an independent auditor before mainnet.
