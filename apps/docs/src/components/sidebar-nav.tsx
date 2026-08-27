import { Link, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@karnstack/dowel";
import { useEffect, useId, useState } from "react";

import { nav } from "../lib/nav";
import type { NavSection } from "../lib/nav";

function NavSectionDisclosure({
  collapseInactive,
  section,
  pathname,
  onNavigate,
}: {
  collapseInactive: boolean;
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = section.items.some((item) => item.to === pathname);
  const [open, setOpen] = useState(collapseInactive ? active : true);
  const itemsId = useId();

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <Sidebar.Section open={open} onOpenChange={setOpen}>
      <Sidebar.SectionTrigger active={active} aria-controls={itemsId}>
        {section.title}
      </Sidebar.SectionTrigger>
      <Sidebar.SectionPanel id={itemsId}>
        <Sidebar.SectionContent>
          {section.items.map((item) => (
            <Sidebar.Item
              key={item.to}
              active={item.to === pathname}
              render={
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: true }}
                />
              }
            >
              {item.title}
            </Sidebar.Item>
          ))}
        </Sidebar.SectionContent>
      </Sidebar.SectionPanel>
    </Sidebar.Section>
  );
}

export function SidebarNav({
  collapseInactive = false,
  onNavigate,
}: {
  collapseInactive?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <Sidebar.Nav aria-label="Documentation">
      {nav.map((section) => (
        <NavSectionDisclosure
          key={section.title}
          collapseInactive={collapseInactive}
          section={section}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </Sidebar.Nav>
  );
}
