"use client";

import { useEffect, useState } from "react";

export function TailwindCheck() {
  const [lines, setLines] = useState<string[]>(["Checking..."]);

  useEffect(() => {
    (async () => {
      const out: string[] = [];

      const t = document.createElement("div");
      t.className = "hidden";
      document.body.appendChild(t);
      const works = getComputedStyle(t).display === "none";
      t.remove();
      out.push(works ? "✅ Tailwind classes ARE working" : "❌ Tailwind classes are NOT being generated");

      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
      out.push(`Stylesheets loaded: ${links.length}`);

      for (const l of links) {
        try {
          const css = await (await fetch(l.href)).text();
          out.push(
            `${l.href.split("/").pop()}\n  size: ${css.length} bytes\n  raw "@tailwind" left in file: ${css.includes("@tailwind")}\n  has .hidden class: ${/\.hidden\b/.test(css)}\n  has base reset: ${css.includes("box-sizing:border-box") || css.includes("box-sizing: border-box")}`
          );
        } catch {
          out.push("Could not read " + l.href);
        }
      }
      setLines(out);
    })();
  }, []);

  return <pre style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.6 }}>{lines.join("\n\n")}</pre>;
}
