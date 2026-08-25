import {
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import * as styles from "./breadcrumbs.stylex";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
}
export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  ariaLabel?: string;
  maxItems?: number;
}
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
export function Breadcrumbs({
  items,
  ariaLabel = "Breadcrumbs",
  maxItems = 5,
}: BreadcrumbsProps) {
  const visible: Array<BreadcrumbItem | "ellipsis"> =
    items.length > maxItems
      ? [items[0]!, "ellipsis", ...items.slice(-(maxItems - 2))]
      : items;
  return (
    <nav
      aria-label={ariaLabel}
      {...sx(styles.breadcrumbs.root)}
      data-dowel-component="breadcrumbs"
    >
      <ol {...sx(styles.breadcrumbs.list)}>
        {visible.map((item, index) => (
          <li
            key={
              item === "ellipsis" ? "ellipsis" : `${index}-${String(item.href)}`
            }
            {...sx(styles.breadcrumbs.item)}
          >
            {index > 0 ? (
              <ChevronRightIcon
                width={12}
                height={12}
                aria-hidden="true"
                {...sx(styles.breadcrumbs.separator)}
              />
            ) : null}
            {item === "ellipsis" ? (
              <span
                aria-label="More levels"
                {...sx(styles.breadcrumbs.ellipsis)}
              >
                <EllipsisHorizontalIcon width={14} height={14} />
              </span>
            ) : item.href && !item.current ? (
              <a href={item.href} {...sx(styles.breadcrumbs.link)}>
                {item.label}
              </a>
            ) : (
              <span
                aria-current={item.current ? "page" : undefined}
                {...sx(styles.breadcrumbs.current)}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
