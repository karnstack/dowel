import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

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
  return (
    <span
      ref={ref}
      {...props}
      // Everything below stays AFTER the spread so props spread onto the
      // component can never override appearance. JSX children also beat any
      // `children` smuggled through the spread, keeping `keys` the only
      // content source.
      className="dowel-kbd"
      style={undefined}
    >
      {keys.map((key, i) => (
        <kbd key={`${key}-${i}`}>{key}</kbd>
      ))}
    </span>
  );
});
