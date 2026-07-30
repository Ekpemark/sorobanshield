"use client";

import { useMemo, useState } from "react";
import { exampleContract, Finding, scan } from "../lib/scanner";

const colors: Record<string, string> = { High: "high", Medium: "medium", Low: "low", Critical: "critical" };

function Report({ findings }: { findings: Finding[] }) {
  const high = findings.filter(f => f.severity === "High" || f.severity === "Critical").length;
  return <section className="panel results" aria-live="polite">
    <div className="results-heading"><div><p className="eyebrow">Audit readiness report</p><h2>{findings.length ? `${findings.length} finding${findings.length === 1 ? "" : "s"} detected` : "No matching patterns"}</h2></div><span className={high ? "risk risk-high" : "risk risk-clear"}>{high ? `${high} high-risk` : "Review complete"}</span></div>
    {findings.length === 0 ? <p className="empty">This heuristic scan found no configured patterns. It is not a substitute for a professional audit.</p> : <div className="finding-list">{findings.map((finding, i) => <article className="finding" key={`${finding.id}-${i}`}><div className="finding-top"><span className={`pill ${colors[finding.severity]}`}>{finding.severity}</span><span className="rule">{finding.id} · line {finding.line}</span></div><h3>{finding.title}</h3><code>{finding.evidence}</code><p>{finding.why}</p><div className="fix"><strong>Recommended fix</strong><span>{finding.remediation}</span></div></article>)}</div>}
  </section>;
}

export default function Home() {
  const [code, setCode] = useState(exampleContract);
  const [scanned, setScanned] = useState(false);
  const findings = useMemo(() => scan(code), [code]);
  const downloadReport = () => {
    const body = `# SorobanShield security report\n\nGenerated: ${new Date().toISOString()}\n\n## Findings\n\n${findings.map(f => `### ${f.severity}: ${f.title} (${f.id}, line ${f.line})\n\nEvidence: \`${f.evidence}\`\n\nWhy it matters: ${f.why}\n\nRecommended fix: ${f.remediation}`).join("\n\n") || "No configured pattern matches were found."}\n\n---\nThis automated report supports audit preparation and is not a professional audit.`;
    const href = URL.createObjectURL(new Blob([body], { type: "text/markdown" })); const a = document.createElement("a"); a.href = href; a.download = "sorobanshield-report.md"; a.click(); URL.revokeObjectURL(href);
  };
  return <main><nav><a className="brand" href="#top"><span>◈</span> SorobanShield</a><div><a href="#scanner">Scanner</a><a href="#how">How it works</a><button className="nav-button" onClick={() => document.getElementById("scanner")?.scrollIntoView()}>Run a scan</button></div></nav>
    <section className="hero" id="top"><div><p className="eyebrow">SOROBAN-NATIVE SECURITY</p><h1>Find risk before your contract reaches the network.</h1><p className="lead">SorobanShield gives Rust developers fast, explainable security checks for authorization, storage, external calls, and arithmetic—built around Soroban’s model.</p><div className="hero-actions"><button onClick={() => document.getElementById("scanner")?.scrollIntoView()}>Scan a contract <span>→</span></button><a href="#how">See the workflow</a></div></div><aside className="hero-card"><div className="signal"><span></span> SCAN ENGINE ONLINE</div><div className="metric"><strong>4</strong><span>Soroban-specific checks</span></div><div className="metric"><strong>1 click</strong><span>Exportable audit-readiness report</span></div><div className="note">Designed to support—not replace—independent professional audits.</div></aside></section>
    <section className="scanner-section" id="scanner"><div className="section-intro"><p className="eyebrow">INTERACTIVE MVP</p><h2>Review a Soroban contract</h2><p>Paste Rust source or start from the intentionally unsafe demo contract. Checks run locally in your browser.</p></div><div className="workspace"><section className="panel editor"><div className="panel-top"><span>contract.rs</span><button className="quiet" onClick={() => setCode(exampleContract)}>Reset demo</button></div><textarea value={code} onChange={e => {setCode(e.target.value); setScanned(false);}} spellCheck="false" aria-label="Soroban Rust contract source"/><div className="editor-footer"><span>{code.split("\n").length} lines</span><button onClick={() => setScanned(true)}>Run security scan <span>→</span></button></div></section>{scanned ? <Report findings={findings}/> : <section className="panel ready"><div className="radar">◌</div><h2>Ready to inspect</h2><p>Run the scanner to generate annotated security findings and a shareable report.</p></section>}</div>{scanned && <div className="report-action"><button className="secondary" onClick={downloadReport}>Download Markdown report</button></div>}</section>
    <section className="workflow" id="how"><p className="eyebrow">DEVELOPER WORKFLOW</p><h2>From source code to audit preparation.</h2><div className="steps"><article><b>01</b><h3>Scan</h3><p>Run Soroban-aware static rules while you write Rust.</p></article><article><b>02</b><h3>Understand</h3><p>Read clear impact explanations and recommended fixes.</p></article><article><b>03</b><h3>Ship safer</h3><p>Export reports, then bring clean code to an auditor.</p></article></div></section>
    <footer>Built by <strong>LeyendaCodes</strong> · SorobanShield MVP · <span>Security guidance, not an audit.</span></footer></main>;
}
