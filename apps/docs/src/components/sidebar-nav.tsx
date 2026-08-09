import { Link } from "@tanstack/react-router";

import { nav } from "../lib/nav";

/**
 * One nav, rendered twice: once in the sticky desktop sidebar and once in the
 * mobile disclosure panel. Sharing the component is what stops the two from
 * listing different components, which is the usual way a mobile menu rots.
 */
export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      {nav.map((section) => (
        <div className="docs-nav-section" key={section.title}>
          <p className="docs-nav-heading">{section.title}</p>
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
      ))}
    </nav>
  );
}
