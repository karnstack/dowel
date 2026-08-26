import { createFileRoute } from "@tanstack/react-router";

import packageMetadata from "../../../../packages/dowel/package.json";
import { DocsPage, Section } from "../components/docs-page";

export const Route = createFileRoute("/dependencies")({
  component: DependenciesDocs,
});

const toc = [
  { id: "runtime", title: "Runtime dependencies" },
  { id: "peers", title: "Peer prerequisites" },
  { id: "not-included", title: "What is not included" },
  { id: "challenge", title: "Challenge a choice" },
];

const runtimeDependencies = [
  {
    name: "@base-ui/react",
    version: packageMetadata.dependencies["@base-ui/react"],
    role: "Its unstyled, composable primitives give Dowel proven focus, keyboard, overlay, and selection behavior without imposing a competing visual system.",
  },
  {
    name: "@heroicons/react",
    version: packageMetadata.dependencies["@heroicons/react"],
    role: "Its 16px solid Micro set gives Dowel a consistent vocabulary for built-in functional controls and semantic defaults without maintaining bespoke SVG paths.",
  },
  {
    name: "@stylexjs/stylex",
    version: packageMetadata.dependencies["@stylexjs/stylex"],
    role: "It provides typed theme variables and deterministic style composition while compiling CSS ahead of time, so consumers need no StyleX build configuration.",
  },
  {
    name: "@tanstack/react-table",
    version: packageMetadata.dependencies["@tanstack/react-table"],
    role: "Its headless, application-controlled state model handles advanced table behavior without coupling Dowel to a table layout or data-fetching opinion.",
  },
  {
    name: "@tanstack/react-form",
    version: packageMetadata.dependencies["@tanstack/react-form"],
    role: "Its typed, headless state and validation model powers Dowel's pre-bound form hook while leaving schema choice and submission behavior application-owned.",
  },
  {
    name: "@internationalized/date",
    version: packageMetadata.dependencies["@internationalized/date"],
    role: "Its timezone-safe date types and locale-aware calendar arithmetic keep date-only values stable across regions, time zones, and calendar systems.",
  },
  {
    name: "react-aria-components",
    version: packageMetadata.dependencies["react-aria-components"],
    role: "It supplies the Calendar and DatePicker accessibility model, including roving focus, keyboard navigation, localized date segments, and validation behavior.",
  },
] as const;

const peerDependencies = [
  {
    name: "react",
    version: packageMetadata.peerDependencies.react,
    role: "Dowel targets React 19 so it can use the current ref, context, and rendering model while sharing one React instance with the host application.",
  },
  {
    name: "react-dom",
    version: packageMetadata.peerDependencies["react-dom"],
    role: "React DOM supplies the browser renderer and portal behavior that Dowel overlays require, while remaining owned by the host application.",
  },
] as const;

function DependencyTable({
  dependencies,
}: {
  dependencies: ReadonlyArray<{
    name: string;
    version: string;
    role: string;
  }>;
}) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th scope="col">Package</th>
            <th scope="col">Version range</th>
            <th scope="col">Why Dowel chose it</th>
          </tr>
        </thead>
        <tbody>
          {dependencies.map((dependency) => (
            <tr key={dependency.name}>
              <td>
                <code>{dependency.name}</code>
              </td>
              <td>
                <code>{dependency.version}</code>
              </td>
              <td>{dependency.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DependenciesDocs() {
  return (
    <DocsPage
      eyebrow="Library"
      title="Dependencies"
      lead="The packages a Dowel installation brings into your dependency graph, the runtimes your application owns, and the choices Dowel leaves open."
      toc={toc}
    >
      <Section id="runtime" title="Runtime dependencies">
        <p>
          These packages install with <code>@karnstack/dowel</code>. Dowel
          imports them from its published JavaScript, so they are direct runtime
          dependencies rather than build tooling.
        </p>
        <p>
          Their transitive dependencies are resolved by the package manager and
          can change independently. Use <code>pnpm why</code> or your package
          manager's equivalent when you need the complete installed graph for a
          specific release.
        </p>
        <DependencyTable dependencies={runtimeDependencies} />
      </Section>

      <Section id="peers" title="Peer prerequisites">
        <p>
          React stays application-owned so Dowel shares the same renderer and
          context as the rest of your product. Your package manager may install
          missing peers, but the application remains responsible for choosing
          compatible versions.
        </p>
        <DependencyTable dependencies={peerDependencies} />
      </Section>

      <Section id="not-included" title="What is not included">
        <p>
          Dowel does not install a router, schema validator, or data-fetching
          client, and it does not prescribe an application-wide icon system.
          Consumer-facing icon slots accept ordinary React content, so
          applications keep control of their visual language.
        </p>
        <p>
          Dowel uses <a href="https://heroicons.com/">Heroicons Micro</a> at its
          native 16px size for icons the library owns, including search,
          selection, sorting, and Callout's tone-aware defaults. Callout accepts
          an icon override and treats <code>icon={"{null}"}</code> as an
          explicit request to hide its default. The documentation chrome uses
          the same set for consistency.
        </p>
      </Section>

      <Section id="challenge" title="Challenge a choice">
        <p>
          Dependency choices are architecture decisions, not permanent facts. If
          a package creates a constraint, adds avoidable weight, or has a better
          alternative, open a{" "}
          <a href="https://github.com/karnstack/dowel/issues/new">
            GitHub issue
          </a>{" "}
          with the tradeoff you see and the replacement you would consider.
        </p>
      </Section>
    </DocsPage>
  );
}
