import { mkdir, readFile, writeFile } from "node:fs/promises";

import { componentNav } from "../src/lib/nav.ts";

const docsOrigin = "https://dowel.sh";
const publicRoot = new URL("../public/", import.meta.url);
const packageRoot = new URL("../../../packages/dowel/", import.meta.url);
const tick = String.fromCharCode(96);

function absolute(path) {
  return new URL(path, docsOrigin).href;
}

function componentSlug(item) {
  return String(item.to).replace("/components/", "");
}

function componentMarkdown(item, heading = "#") {
  const docsUrl = absolute(String(item.to));
  const markdownUrl = absolute(String(item.to) + ".md");
  return [
    heading + " " + item.title,
    "",
    "> " + item.summary,
    "",
    "- Package: " + tick + "@karnstack/dowel" + tick,
    "- [HTML documentation](" + docsUrl + ")",
    "- [Markdown documentation](" + markdownUrl + ")",
    "",
    "Import public components and types from the package root. Import " +
      tick +
      "@karnstack/dowel/dowel.css" +
      tick +
      " once at the application root.",
  ].join("\n");
}

await mkdir(new URL("components/", publicRoot), { recursive: true });

for (const item of componentNav) {
  await writeFile(
    new URL("components/" + componentSlug(item) + ".md", publicRoot),
    componentMarkdown(item) + "\n",
  );
}

const packageMetadata = JSON.parse(
  await readFile(new URL("package.json", packageRoot), "utf8"),
);
const componentLinks = componentNav
  .map(
    (item) =>
      "- [" +
      item.title +
      "](" +
      absolute(String(item.to) + ".md") +
      "): " +
      item.summary,
  )
  .join("\n");

const llms = [
  "# Dowel",
  "",
  "> Dowel is an opinionated React component library for compact, accessible product interfaces.",
  "",
  "Install " +
    tick +
    "@karnstack/dowel" +
    tick +
    ", import " +
    tick +
    "@karnstack/dowel/dowel.css" +
    tick +
    " once, and import components from the package root. Dowel targets React 19.",
  "",
  "## Components",
  "",
  componentLinks,
  "",
  "## Library",
  "",
  "- [Complete documentation](" +
    absolute("/llms-full.txt") +
    "): All component summaries in one Markdown document.",
  "- [Component index](" +
    absolute("/components/index.md") +
    "): Compact component catalog.",
  "- [Dependencies](" +
    absolute("/dependencies.md") +
    "): Runtime and peer dependency overview.",
  "- [GitHub](https://github.com/karnstack/dowel): Source, issues, and releases.",
  "",
].join("\n");

const componentDocs = componentNav
  .map((item) => componentMarkdown(item, "##"))
  .join("\n\n---\n\n");
const llmsFull = [
  "# Dowel complete documentation",
  "",
  "> Dowel " +
    packageMetadata.version +
    " is an opinionated React component library for compact, accessible product interfaces.",
  "",
  "## Installation",
  "",
  tick.repeat(3) + "sh",
  "pnpm add @karnstack/dowel",
  tick.repeat(3),
  "",
  tick.repeat(3) + "tsx",
  'import "@karnstack/dowel/dowel.css";',
  tick.repeat(3),
  "",
  "## Conventions",
  "",
  "- Import public components and types from " +
    tick +
    "@karnstack/dowel" +
    tick +
    ".",
  "- Wrap the application in " +
    tick +
    "ThemeProvider" +
    tick +
    " when selecting light, dark, or system themes explicitly.",
  "- Dowel controls own their appearance. Prefer documented props over consumer class or style overrides.",
  "- Icon-only controls require an accessible " + tick + "label" + tick + ".",
  "",
  componentDocs,
  "",
].join("\n");

const componentIndex = [
  "# Dowel components",
  "",
  "> The complete Dowel component catalog.",
  "",
  componentLinks,
  "",
].join("\n");

const dependencyLines = Object.entries(packageMetadata.dependencies)
  .map(
    ([name, version]) =>
      "- " + tick + name + tick + ": " + tick + version + tick,
  )
  .join("\n");
const peerLines = Object.entries(packageMetadata.peerDependencies)
  .map(
    ([name, version]) =>
      "- " + tick + name + tick + ": " + tick + version + tick,
  )
  .join("\n");
const dependencies = [
  "# Dowel dependencies",
  "",
  "> Runtime packages installed with Dowel and peer runtimes owned by the consuming application.",
  "",
  "## Runtime dependencies",
  "",
  dependencyLines,
  "",
  "## Peer dependencies",
  "",
  peerLines,
  "",
].join("\n");

const index = [
  "# Dowel",
  "",
  "> Compact, accessible React components for product interfaces.",
  "",
  "- [Agent documentation index](" + absolute("/llms.txt") + ")",
  "- [Complete agent documentation](" + absolute("/llms-full.txt") + ")",
  "- [Component catalog](" + absolute("/components/index.md") + ")",
  "- [HTML documentation](" + absolute("/components") + ")",
  "",
].join("\n");

await Promise.all([
  writeFile(new URL("llms.txt", publicRoot), llms),
  writeFile(new URL("llms-full.txt", publicRoot), llmsFull),
  writeFile(new URL("components/index.md", publicRoot), componentIndex),
  writeFile(new URL("dependencies.md", publicRoot), dependencies),
  writeFile(new URL("index.md", publicRoot), index),
]);
