import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./separator.stylex";

export interface SeparatorProps
  extends Omit<
    ComponentPropsWithoutRef<"div">,
    "children" | "className" | "style" | "role" | "aria-orientation"
  > {
  orientation?: "horizontal" | "vertical";
  /** Decorative separators are hidden from the accessibility tree. */
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  function Separator(
    { orientation = "horizontal", decorative = true, ...props },
    ref,
  ) {
    const safeProps = withoutAppearanceProps(props);
    const resolved = stylex.props(
      styles.root.base,
      styles.orientation[orientation],
    );

    return (
      <div
        ref={ref}
        {...safeProps}
        className={resolved.className}
        style={resolved.style}
        role={decorative ? "none" : "separator"}
        aria-hidden={decorative ? true : undefined}
        aria-orientation={decorative ? undefined : orientation}
        data-dowel-component="separator"
        data-orientation={orientation}
      />
    );
  },
);
