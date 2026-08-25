import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { withoutAppearanceProps } from "../_shared/props";
import * as styles from "./skeleton.stylex";

export type SkeletonVariant = "text" | "block" | "circle";
export type SkeletonSize = "sm" | "md" | "lg";

export interface SkeletonProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    "children" | "className" | "style"
  > {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton({ variant = "text", size = "md", ...props }, ref) {
    const safeProps = withoutAppearanceProps(props);
    return (
      <span
        ref={ref}
        {...safeProps}
        {...stylex.props(
          styles.root.base,
          styles.variant[variant],
          styles[`${variant}Size`][size],
        )}
        aria-hidden="true"
        data-dowel-component="skeleton"
        data-variant={variant}
        data-size={size}
      />
    );
  },
);
