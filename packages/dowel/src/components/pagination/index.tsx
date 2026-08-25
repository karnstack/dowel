import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import * as styles from "./pagination.stylex";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  ariaLabel?: string;
}
type Token = number | "ellipsis-start" | "ellipsis-end";
function tokens(page: number, total: number, siblings: number): Token[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(2, page - siblings);
  const end = Math.min(total - 1, page + siblings);
  const out: Token[] = [1];
  if (start > 2) out.push("ellipsis-start");
  for (let n = start; n <= end; n++) out.push(n);
  if (end < total - 1) out.push("ellipsis-end");
  out.push(total);
  return out;
}
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  ariaLabel = "Pagination",
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotal);
  return (
    <nav
      aria-label={ariaLabel}
      {...sx(styles.pagination.root)}
      data-dowel-component="pagination"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={safePage === 1}
        onClick={() => onPageChange(safePage - 1)}
        {...sx(styles.pagination.button)}
      >
        <ChevronLeftIcon width={14} height={14} />
      </button>
      {tokens(safePage, safeTotal, siblingCount).map((token) =>
        typeof token === "number" ? (
          <button
            key={token}
            type="button"
            aria-label={`Page ${token}`}
            aria-current={token === safePage ? "page" : undefined}
            onClick={() => onPageChange(token)}
            {...sx(
              styles.pagination.button,
              token === safePage && styles.pagination.active,
            )}
          >
            {token}
          </button>
        ) : (
          <span
            key={token}
            aria-hidden="true"
            {...sx(styles.pagination.ellipsis)}
          >
            <EllipsisHorizontalIcon width={14} height={14} />
          </span>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={safePage === safeTotal}
        onClick={() => onPageChange(safePage + 1)}
        {...sx(styles.pagination.button)}
      >
        <ChevronRightIcon width={14} height={14} />
      </button>
    </nav>
  );
}
