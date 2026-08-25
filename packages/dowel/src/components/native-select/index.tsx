import { Input as BaseInput } from "@base-ui/react/input";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type {
  AriaAttributes,
  ComponentPropsWithoutRef,
  CSSProperties,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from "react";

import { withoutAppearanceProps } from "../_shared/props";
import type { FieldSize } from "../input";
import * as styles from "./native-select.stylex";

export interface NativeSelectProps
  extends Omit<
    ComponentPropsWithoutRef<"select">,
    "className" | "style" | "size"
  > {
  size?: Exclude<FieldSize, "title">;
  invalid?: boolean;
}

type BaseNativeSelectProps = Omit<NativeSelectProps, "size" | "invalid"> & {
  className?: string;
  render: ReactElement;
  style?: CSSProperties;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
};

const BaseNativeSelect = BaseInput as unknown as ForwardRefExoticComponent<
  BaseNativeSelectProps & RefAttributes<HTMLSelectElement>
>;

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ size = "md", invalid, children, ...props }, ref) {
    const safeProps = withoutAppearanceProps(props);
    return (
      <span
        {...stylex.props(styles.root.base)}
        data-dowel-component="native-select"
        data-size={size}
      >
        <BaseNativeSelect
          ref={ref}
          render={<select />}
          {...safeProps}
          {...(invalid ? { "aria-invalid": true } : null)}
          {...stylex.props(
            styles.control.base,
            styles.size[size],
            invalid && styles.control.invalid,
          )}
        >
          {children}
        </BaseNativeSelect>
        <svg
          {...stylex.props(styles.icon.root)}
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" />
        </svg>
      </span>
    );
  },
);
