import { Switch as BaseSwitch } from "@base-ui/react/switch";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import * as styles from "./switch.stylex";

export interface SwitchProps
  extends Omit<
    ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
    "children" | "className" | "style" | "render"
  > {}

export const Switch = forwardRef<HTMLElement, SwitchProps>(
  function Switch(props, ref) {
    const root = stylex.props(styles.control.root);
    const thumb = stylex.props(styles.control.thumb);

    return (
      <BaseSwitch.Root
        ref={ref}
        {...props}
        className={root.className}
        style={root.style}
        data-dowel-component="switch"
      >
        <BaseSwitch.Thumb
          className={thumb.className}
          style={thumb.style}
          data-dowel-component="switch-thumb"
        />
      </BaseSwitch.Root>
    );
  },
);
