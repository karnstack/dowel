import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./kbd.stylex";

export interface KbdProps
  extends Omit<
    ComponentPropsWithoutRef<"span">,
    // dowel is opinionated: appearance is not a consumer concern. children is
    // omitted too — the `keys` array is the only content source.
    "className" | "style" | "children"
  > {
  /** One entry per key, e.g. `["Meta", "K"]`. */
  keys: string[];
}

export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(function Kbd(
  { keys, ...props },
  ref,
) {
  const resolved = stylex.props(styles.kbd.root);

  return (
    <span
      ref={ref}
      {...props}
      // Everything below stays AFTER the spread so props spread onto the
      // component can never override appearance. JSX children also beat any
      // `children` smuggled through the spread, keeping `keys` the only
      // content source.
      className={resolved.className}
      style={resolved.style}
      data-dowel-component="kbd"
    >
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          {...stylex.props(styles.kbd.key)}
          data-dowel-part="kbd-key"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
});
