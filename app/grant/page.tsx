import Link from "next/link";
import "./grant.css";

const deliverables = [
  ["01", "Rule pack", "Ship 10 documented Soroban checks for authorization, storage, external calls, and arithmetic."],
  ["02", "Evidence suite", "Publish 20 safe and intentionally vulnerable fixture contracts with automated tests."],
  ["03", "Developer beta", "Release the local-first scanner, Markdown report export, and a testnet-ready walkthrough."],
  ["04", "Community validation", "Share the demo with the local Stellar Ambassador Chapter and capture structured feedback."],
];

export default function GrantPage() {
  return <main className="grant-page"><nav><Link className="brand" href="/"><span>◈</span> SorobanShield</Link><div><Link href="/">Product demo</Link><a href="#scope">30-day scope</a><a className="nav-button" href="https://communityfund.stellar.org/" target="_blank" rel="noreferrer">Stellar Community Fund ↗</a></div></nav>
    <section className="grant-hero"><p className="eyebrow">LEYENDACODES · STELLAR ECOSYSTEM TOOLING</p><h1>Build safer Soroban contracts from the first commit.</h1><p>SorobanShield is a local-first security and audit-preparation tool for Rust smart-contract developers. It makes common Soroban review points visible before testnet deployment and professional audit.</p><div className="grant-facts"><div><strong>$5,000</strong><span>Requested Instaward scope</span></div><div><strong>30 days</strong><span>Execution sprint</span></div><div><strong>Open source</strong><span>Core rules and fixtures</span></div></div></section>
    <section className="grant-section" id="scope"><div className="section-intro"><p className="eyebrow">EXECUTION SCOPE</p><h2>A small, verifiable first release.</h2><p>This scope intentionally prioritizes working developer tooling and proof of use over unverified security claims.</p></div><div className="deliverables">{deliverables.map(([number,title,description]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="grant-section dark"><div><p className="eyebrow">WHY SOROBAN</p><h2>Security feedback shaped by Soroban’s model.</h2></div><div className="reason-grid"><p><strong>Authorization</strong>Review privileged paths where an expected address should explicitly authorize the action.</p><p><strong>Storage lifecycle</strong>Highlight persistent storage decisions that need key ownership and lifetime review.</p><p><strong>Rust patterns</strong>Surface arithmetic and error-handling review points in the language Soroban developers use.</p><p><strong>Audit preparation</strong>Generate transparent findings that help developers and independent auditors start from the same evidence.</p></div></section>
    <section className="grant-section"><div className="section-intro"><p className="eyebrow">MEASURABLE OUTCOMES</p><h2>What completion looks like.</h2></div><div className="outcomes"><div><strong>10+</strong><span>documented security rules</span></div><div><strong>20+</strong><span>tested source fixtures</span></div><div><strong>1</strong><span>public, reproducible beta release</span></div><div><strong>5</strong><span>structured developer feedback sessions</span></div></div></section>
    <section className="cta"><p className="eyebrow">TRY THE MVP</p><h2>Inspect the included Soroban Rust example.</h2><p>The current browser MVP never uploads source code.</p><Link href="/">Open the scanner →</Link></section>
    <footer>Built by <strong>LeyendaCodes</strong> · SorobanShield · Security guidance, not a professional audit.</footer>
  </main>;
}
