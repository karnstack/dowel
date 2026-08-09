// Bundles src/index.css (following @import) into one minified dist/dowel.css.
// Lightning CSS is used as a library rather than the CLI so the targets and
// the drafts flag stay in version control instead of a shell string.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { bundle, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, "..", "src", "index.css");
const out = resolve(here, "..", "dist", "dowel.css");

// lch() and cascade layers both need reasonably current browsers; this is the
// floor dowel supports and it is asserted in the README.
const targets = browserslistToTargets(
  browserslist(["chrome >= 111", "firefox >= 113", "safari >= 16.4"]),
);

const { code, warnings } = bundle({
  filename: entry,
  minify: true,
  targets,
  drafts: { customMedia: false },
});

for (const w of warnings) console.warn(`lightningcss: ${w.message}`);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, code);
console.log(`built dist/dowel.css (${(code.length / 1024).toFixed(1)} kB)`);
