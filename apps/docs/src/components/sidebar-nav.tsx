import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import { ChevronRightIcon } from "./icons";
import { nav } from "../lib/nav";
import type { NavSection } from "../lib/nav";

function NavSectionDisclosure({
  section,
  pathname,
  onNavigate,
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = section.items.some((item) => item.to === pathname);
  const [open, setOpen] = useState(true);
  const itemsId = useId();

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <section
      className="docs-nav-section"
      data-open={open ? "" : undefined}
      data-active={active ? "" : undefined}
    >
      <button
        type="button"
        className="docs-nav-heading"
        aria-expanded={open}
        aria-controls={itemsId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{section.title}</span>
        <span className="docs-nav-chevron">
          <ChevronRightIcon />
        </span>
      </button>
      <div
        id={itemsId}
        className="docs-nav-items"
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <ul role="list">
          {section.items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={onNavigate}
                // Without `exact`, "/" matches every route and the
                // Introduction link stays highlighted on every page.
                activeOptions={{ exact: true }}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * One nav, rendered twice: once in the sticky desktop sidebar and once in the
 * mobile disclosure panel. Sharing the component is what stops the two from
 * listing different components, which is the usual way a mobile menu rots.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="docs-nav" aria-label="Documentation">
      {nav.map((section) => (
        <NavSectionDisclosure
          key={section.title}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
