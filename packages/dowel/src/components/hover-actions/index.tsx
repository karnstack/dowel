import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./hover-actions.stylex";

type DivProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "className" | "style" | "role"
>;

export interface HoverActionsProps extends DivProps {
  /** Accessible name for the row action collection. */
  label?: string;
  /** Reveals the actions. Hidden actions remain keyboard discoverable. */
  visible?: boolean;
}

export const HoverActions = forwardRef<HTMLDivElement, HoverActionsProps>(
  function HoverActions(
    { label = "Row actions", visible = true, ...props },
    ref,
  ) {
    const resolved = stylex.props(
      styles.actions.root,
      !visible && styles.actions.concealed,
    );

    return (
      <div
        ref={ref}
        {...props}
        className={resolved.className}
        style={resolved.style}
        role="toolbar"
        aria-label={label}
        data-dowel-component="hover-actions"
        data-visible={visible || undefined}
      />
    );
  },
);
