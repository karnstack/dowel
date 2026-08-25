import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./list.stylex";

type UlProps = Omit<ComponentPropsWithoutRef<"ul">, "className" | "style">;
type LiProps = Omit<ComponentPropsWithoutRef<"li">, "className" | "style">;
type DivProps = Omit<ComponentPropsWithoutRef<"div">, "className" | "style">;

export interface ListProps extends UlProps {
  divided?: boolean;
}

export interface ListRowProps extends LiProps {
  density?: "compact" | "default";
  selected?: boolean;
  disabled?: boolean;
}

export interface ListCellProps extends DivProps {
  grow?: boolean;
  align?: "start" | "end";
  tone?: "primary" | "secondary" | "tertiary";
  truncate?: boolean;
}

export interface GroupHeaderProps extends LiProps {
  sticky?: boolean;
}

export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { divided = false, ...props },
  ref,
) {
  const resolved = stylex.props(
    styles.list.root,
    divided && styles.list.divided,
  );
  return (
    <ul
      ref={ref}
      role="list"
      {...props}
      className={resolved.className}
      style={resolved.style}
      data-dowel-component="list"
      data-divided={divided || undefined}
    />
  );
});

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(function ListRow(
  { density = "default", selected = false, disabled = false, ...props },
  ref,
) {
  const resolved = stylex.props(
    styles.row.root,
    density === "compact" && styles.row.compact,
    selected && styles.row.selected,
    disabled && styles.row.disabled,
  );
  return (
    <li
      ref={ref}
      {...props}
      className={resolved.className}
      style={resolved.style}
      data-dowel-component="list-row"
      data-density={density}
      data-disabled={disabled || undefined}
      data-selected={selected || undefined}
    />
  );
});

export const ListCell = forwardRef<HTMLDivElement, ListCellProps>(
  function ListCell(
    {
      grow = false,
      align = "start",
      tone = "primary",
      truncate = false,
      ...props
    },
    ref,
  ) {
    const resolved = stylex.props(
      styles.cell.root,
      grow && styles.cell.grow,
      align === "end" && styles.cell.end,
      tone === "secondary" && styles.cell.secondary,
      tone === "tertiary" && styles.cell.tertiary,
      truncate && styles.cell.truncate,
    );
    return (
      <div
        ref={ref}
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="list-cell"
        data-align={align}
        data-tone={tone}
      />
    );
  },
);

export const GroupHeader = forwardRef<HTMLLIElement, GroupHeaderProps>(
  function GroupHeader({ sticky = false, ...props }, ref) {
    const resolved = stylex.props(
      styles.groupHeader.root,
      sticky && styles.groupHeader.sticky,
    );
    return (
      <li
        ref={ref}
        {...props}
        className={resolved.className}
        style={resolved.style}
        data-dowel-component="group-header"
        data-sticky={sticky || undefined}
      />
    );
  },
);
