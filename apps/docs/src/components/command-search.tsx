import { Dialog, Input, Kbd } from "dowel";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { componentNav } from "../lib/nav";
import { SearchIcon } from "./icons";

const allComponents = {
  title: "All components",
  to: "/components" as const,
  summary: "Browse every component in the library.",
};

export function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const items = [allComponents, ...componentNav];
    if (!normalized) return items;
    return items.filter((item) =>
      `${item.title} ${item.summary}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => setActiveIndex(0), [query]);
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  function openResult(index: number) {
    const result = results[index];
    if (!result) return;
    onOpenChange(false);
    void navigate({ to: result.to });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup variant="bare">
          <div className="docs-command" role="search">
            <div className="sr-only">
              <Dialog.Title>Search components</Dialog.Title>
            </div>
            <div className="docs-command-input">
              <SearchIcon />
              <Input
                autoFocus
                aria-activedescendant={
                  results[activeIndex]
                    ? `component-search-option-${activeIndex}`
                    : undefined
                }
                aria-autocomplete="list"
                aria-controls="component-search-results"
                aria-expanded="true"
                aria-label="Search components"
                name="component-search"
                placeholder="Search components..."
                role="combobox"
                value={query}
                variant="bare"
                onChange={(event) => setQuery(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (!results.length) return;
                    setActiveIndex((index) =>
                      Math.min(index + 1, results.length - 1),
                    );
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (!results.length) return;
                    setActiveIndex((index) => Math.max(index - 1, 0));
                  } else if (event.key === "Enter") {
                    event.preventDefault();
                    openResult(activeIndex);
                  }
                }}
              />
              <Kbd keys={["Esc"]} />
            </div>

            <div
              className="docs-command-results"
              id="component-search-results"
              role="listbox"
            >
              {results.length ? (
                results.map((result, index) => (
                  <button
                    aria-selected={index === activeIndex}
                    className="docs-command-result"
                    id={`component-search-option-${index}`}
                    key={result.to}
                    role="option"
                    type="button"
                    onClick={() => openResult(index)}
                    onPointerMove={() => setActiveIndex(index)}
                  >
                    <span>{result.title}</span>
                    <small>{result.summary}</small>
                  </button>
                ))
              ) : (
                <p className="docs-command-empty">No components found.</p>
              )}
            </div>

            <div className="docs-command-footer" aria-hidden="true">
              <span>
                <Kbd keys={["↑"]} />
                <Kbd keys={["↓"]} />
                Navigate
              </span>
              <span>
                <Kbd keys={["Enter"]} />
                Open
              </span>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
