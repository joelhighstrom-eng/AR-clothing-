import fs from "fs";
import path from "path";
import { TailwindCheck } from "@/components/tailwind-check";

export const dynamic = "force-static";

const read = (p: string) => {
  try {
    return fs.readFileSync(path.join(process.cwd(), p), "utf8");
  } catch {
    return null;
  }
};

const version = (pkg: string) => {
  const j = read(`node_modules/${pkg}/package.json`);
  if (!j) return "NOT INSTALLED";
  try {
    return JSON.parse(j).version as string;
  } catch {
    return "unreadable";
  }
};

export default function Debug() {
  const root = fs.readdirSync(process.cwd()).sort();
  const postcssName = ["postcss.config.mjs", "postcss.config.js", "postcss.config.cjs"].find((n) => root.includes(n));
  const postcss = postcssName ? read(postcssName) : null;

  const rows: [string, string][] = [
    ["tailwindcss version", version("tailwindcss")],
    ["postcss version", version("postcss")],
    ["autoprefixer version", version("autoprefixer")],
    ["next version", version("next")],
    ["postcss config file", postcssName ?? "MISSING"],
    ["tailwind.config.ts", root.includes("tailwind.config.ts") ? "found" : "MISSING"],
    ["NODE_ENV at build", String(process.env.NODE_ENV)],
  ];

  return (
    <div style={{ padding: 20, fontFamily: "monospace", background: "#111", color: "#eee", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 20, marginBottom: 16 }}>Build diagnostics</h1>
      {rows.map(([k, v]) => (
        <p key={k} style={{ margin: "6px 0", color: /MISSING|NOT INSTALLED/.test(v) ? "#ff6b6b" : "#9be29b" }}>
          {k}: {v}
        </p>
      ))}
      <h2 style={{ fontSize: 16, margin: "20px 0 8px" }}>postcss config contents</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{postcss ?? "(none found)"}</pre>
      <h2 style={{ fontSize: 16, margin: "20px 0 8px" }}>Files in project root</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{root.join("\n")}</pre>
      <h2 style={{ fontSize: 16, margin: "20px 0 8px" }}>Browser check</h2>
      <TailwindCheck />
    </div>
  );
}
