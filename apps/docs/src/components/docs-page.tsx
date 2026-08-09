import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { componentNav } from "../lib/nav";
import { ArrowRightIcon } from "./icons";

export type TocEntry = { id: string; title: string };

/**
 * A section heading that the table of contents can point at. The `id` is
 * supplied rather than derived from the title so the two lists cannot drift:
 * the same string is the anchor target and the TOC href, and a mismatch is a
 * dead link the moment a heading is reworded.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-section">
      <h2 id={id}>
        <a className="docs-anchor" href={`#${id}`}>
          {title}
        </a>
      </h2>
      {children}
    </section>
  );
}

/**
 * Highlights the heading currently in view. Runs only in an effect, so the
 * prerender never touches IntersectionObserver, and it degrades to a plain
 * list of links if the API is missing.
 */
function useActiveHeading(toc: TocEntry[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0 || typeof IntersectionObserver === "undefined") return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        // First visible heading in document order wins, so scrolling up and
        // down through a section does not flip the highlight around.
        const first = toc.find((t) => seen.get(t.id));
        if (first) setActive(first.id);
      },
      // Bias the band towards the top of the viewport: the heading you are
      // reading under is the one that just left the top, not the one in the
      // vertical middle of the screen.
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    const nodes = toc
      .map((t) => document.getElementById(t.id))
      .filter((n): n is HTMLElement => n !== null);
    for (const n of nodes) observer.observe(n);
    return () => observer.disconnect();
  }, [toc]);

  return active;
}

function PageFooterNav() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  // Trailing slashes appear on the prerendered pages but not in dev, so
  // normalise before comparing or every page loses its prev/next in one of
  // the two environments.
  const current = pathname.replace(/\/+$/, "");
  const i = componentNav.findIndex((item) => item.to === current);
  if (i === -1) return null;

  const prev = componentNav[i - 1];
  const next = componentNav[i + 1];

  return (
    <nav className="docs-pagenav" aria-label="Previous and next component">
      {prev ? (
        <Link className="docs-pagenav-link" data-dir="prev" to={prev.to}>
          <span className="docs-pagenav-label">Previous</span>
          <span className="docs-pagenav-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="docs-pagenav-link" data-dir="next" to={next.to}>
          <span className="docs-pagenav-label">Next</span>
          <span className="docs-pagenav-title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export type DocsPageProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  toc?: TocEntry[];
  children: ReactNode;
};

/**
 * Returns a fragment, not a wrapper: the content column and the table of
 * contents are two cells of the shell's grid, so putting a div around them
 * would collapse the three-column layout into two.
 */
export function DocsPage({
  eyebrow = "Components",
  title,
  lead,
  toc = [],
  children,
}: DocsPageProps) {
  const active = useActiveHeading(toc);

  return (
    <>
      <main className="docs-content">
        <article className="docs-article">
          <header className="docs-article-head">
            <p className="docs-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="docs-lead">{lead}</p>
          </header>
          {children}
        </article>
        <PageFooterNav />
      </main>

      <aside className="docs-toc" aria-label="On this page">
        {toc.length > 0 && (
          <div className="docs-toc-inner">
            <p className="docs-toc-title">On this page</p>
            <ul role="list">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    data-active={active === t.id ? "" : undefined}
                  >
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </>
  );
}

/** The card grid used by the landing page and the components index. */
export function ComponentGrid() {
  return (
    <ul className="docs-cards" role="list">
      {componentNav.map((item) => (
        <li key={item.to}>
          <Link className="docs-card" to={item.to}>
            <span className="docs-card-title">
              {item.title}
              <ArrowRightIcon size={14} />
            </span>
            <span className="docs-card-summary">{item.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
