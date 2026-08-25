import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./spinner.stylex";

export interface SpinnerProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    "children" | "className" | "style" | "role"
  > {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ size = "md", label = "Loading", ...props }, ref) {
    const safeProps = withoutAppearanceProps(props);
    return (
      <span
        ref={ref}
        {...safeProps}
        {...stylex.props(styles.root.base)}
        role="status"
        data-dowel-component="spinner"
        data-size={size}
      >
        <span
          {...stylex.props(styles.visual.base, styles.size[size])}
          aria-hidden="true"
        />
        <span {...stylex.props(styles.part.visuallyHidden)}>{label}</span>
      </span>
    );
  },
);
