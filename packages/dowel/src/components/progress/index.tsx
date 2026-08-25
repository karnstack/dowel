import { Progress as BaseProgress } from "@base-ui/react/progress";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import * as styles from "./progress.stylex";

export interface ProgressProps {
  label: ReactNode;
  value: number | null;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  getAriaValueText?: (formattedValue: string, value: number | null) => string;
}

function sx(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

export function Progress({
  label,
  value,
  min = 0,
  max = 100,
  size = "md",
  showValue = true,
  getAriaValueText,
}: ProgressProps) {
  return (
    <BaseProgress.Root
      value={value}
      min={min}
      max={max}
      getAriaValueText={getAriaValueText}
      {...sx(styles.progress.root)}
      data-dowel-component="progress"
      data-size={size}
    >
      <div {...sx(styles.progress.metadata)}>
        <BaseProgress.Label {...sx(styles.progress.label)}>
          {label}
        </BaseProgress.Label>
        {showValue ? (
          <BaseProgress.Value {...sx(styles.progress.value)} />
        ) : null}
      </div>
      <BaseProgress.Track
        {...sx(
          styles.progress.track,
          size === "sm" && styles.progress.small,
          size === "lg" && styles.progress.large,
        )}
      >
        <BaseProgress.Indicator {...sx(styles.progress.indicator)} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
