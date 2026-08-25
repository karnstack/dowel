import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import * as styles from "./tree-view.stylex";

export interface TreeViewItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: TreeViewItem[];
}
export interface TreeViewProps {
  items: TreeViewItem[];
  selectedId?: string;
  defaultSelectedId?: string;
  onSelectionChange?: (id: string) => void;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  ariaLabel?: string;
}
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
export function TreeView({
  items,
  selectedId,
  defaultSelectedId,
  onSelectionChange,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  ariaLabel = "Tree",
}: TreeViewProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelectedId);
  const [internalExpanded, setInternalExpanded] = useState(defaultExpandedIds);
  const rootRef = useRef<HTMLUListElement>(null);
  const selected = selectedId ?? internalSelected;
  const expanded = expandedIds ?? internalExpanded;
  const expandedSet = useMemo(() => new Set(expanded), [expanded]);
  function setExpanded(next: string[]) {
    if (expandedIds === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
  }
  function choose(id: string) {
    if (selectedId === undefined) setInternalSelected(id);
    onSelectionChange?.(id);
  }
  function toggle(id: string) {
    setExpanded(
      expandedSet.has(id)
        ? expanded.filter((value) => value !== id)
        : [...expanded, id],
    );
  }
  function keyDown(event: KeyboardEvent<HTMLUListElement>) {
    const nodes = [
      ...(rootRef.current?.querySelectorAll<HTMLElement>("[data-tree-node]") ??
        []),
    ].filter((node) => node.offsetParent !== null);
    const index = nodes.indexOf(event.target as HTMLElement);
    if (index < 0) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      nodes[index + (event.key === "ArrowDown" ? 1 : -1)]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      nodes[event.key === "Home" ? 0 : nodes.length - 1]?.focus();
    } else if (event.key === "ArrowRight") {
      const node = nodes[index]!;
      const id = node.dataset.treeNode!;
      if (node.getAttribute("aria-expanded") === "false") {
        event.preventDefault();
        toggle(id);
      } else {
        const next = nodes[index + 1];
        if (next && Number(next.dataset.level) > Number(node.dataset.level)) {
          event.preventDefault();
          next.focus();
        }
      }
    } else if (event.key === "ArrowLeft") {
      const node = nodes[index]!;
      const id = node.dataset.treeNode!;
      if (node.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        toggle(id);
      } else {
        const parentId = node.dataset.parent;
        const parent = parentId
          ? rootRef.current?.querySelector<HTMLElement>(
              `[data-tree-node="${CSS.escape(parentId)}"]`,
            )
          : null;
        if (parent) {
          event.preventDefault();
          parent.focus();
        }
      }
    }
  }
  function renderItems(
    list: TreeViewItem[],
    level: number,
    parent?: string,
  ): ReactNode {
    return list.map((item) => {
      const branch = Boolean(item.children?.length);
      const open = branch && expandedSet.has(item.id);
      return (
        <li key={item.id} role="none">
          <button
            type="button"
            role="treeitem"
            aria-level={level}
            aria-selected={selected === item.id}
            aria-expanded={branch ? open : undefined}
            disabled={item.disabled}
            tabIndex={
              selected === item.id ||
              (!selected && level === 1 && item === list[0])
                ? 0
                : -1
            }
            data-tree-node={item.id}
            data-level={level}
            data-parent={parent}
            onClick={() => {
              choose(item.id);
              if (branch) toggle(item.id);
            }}
            {...sx(
              styles.tree.node,
              selected === item.id && styles.tree.selected,
            )}
          >
            <span
              {...sx(styles.tree.indent)}
              style={{ width: `${(level - 1) * 16}px` }}
            />
            {branch ? (
              <ChevronRightIcon
                width={12}
                height={12}
                aria-hidden="true"
                {...sx(styles.tree.chevron, open && styles.tree.open)}
              />
            ) : (
              <span {...sx(styles.tree.spacer)} />
            )}
            {item.icon ? (
              <span aria-hidden="true" {...sx(styles.tree.icon)}>
                {item.icon}
              </span>
            ) : null}
            <span {...sx(styles.tree.label)}>{item.label}</span>
          </button>
          {branch && open ? (
            <ul role="group" {...sx(styles.tree.group)}>
              {renderItems(item.children!, level + 1, item.id)}
            </ul>
          ) : null}
        </li>
      );
    });
  }
  return (
    <ul
      ref={rootRef}
      role="tree"
      aria-label={ariaLabel}
      onKeyDown={keyDown}
      {...sx(styles.tree.root)}
      data-dowel-component="tree-view"
    >
      {renderItems(items, 1)}
    </ul>
  );
}
