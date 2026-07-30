import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SorobanShield | Soroban security review",
  description: "Open, local-first Soroban security checks and audit preparation for Rust smart contracts.",
  keywords: ["Soroban", "Stellar", "smart contract security", "Rust", "audit preparation"],
  openGraph: {
    title: "SorobanShield | Soroban security review",
    description: "Explainable, local-first security review points for Soroban Rust contracts.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
