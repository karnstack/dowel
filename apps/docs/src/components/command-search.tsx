import { CommandMenu } from "@karnstack/dowel";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { nav } from "../lib/nav";

export function CommandSearch({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const items = useMemo(
    () =>
      nav.flatMap((section) =>
        section.items.map((item) => ({
          id: `${section.title}:${item.to}`,
          label: item.title,
          description: item.summary,
          group: section.title,
          keywords: [section.title],
          onSelect: () => void navigate({ to: item.to }),
        })),
      ),
    [navigate],
  );

  return (
    <CommandMenu
      label="Search documentation"
      items={items}
      defaultOpen
      onOpenChange={onOpenChange}
      placeholder="Search documentation..."
      emptyText="No matching pages"
      footer="↑↓ Navigate · ↵ Open · Esc Close"
    />
  );
}
