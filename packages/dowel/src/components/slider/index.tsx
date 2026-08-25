import { Slider as BaseSlider } from "@base-ui/react/slider";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import * as styles from "./slider.stylex";
type P<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style"
>;
function sx(...v: stylex.StyleXStyles[]) {
  const r = stylex.props(...v);
  return { className: r.className, style: r.style };
}
const Root = forwardRef<HTMLDivElement, P<typeof BaseSlider.Root>>(
  function Root(props, ref) {
    return (
      <BaseSlider.Root
        ref={ref}
        {...props}
        {...sx(styles.slider.root)}
        data-dowel-component="slider"
      />
    );
  },
);
const Label = forwardRef<HTMLDivElement, P<typeof BaseSlider.Label>>(
  function Label(props, ref) {
    return (
      <BaseSlider.Label ref={ref} {...props} {...sx(styles.slider.label)} />
    );
  },
);
const Value = forwardRef<HTMLOutputElement, P<typeof BaseSlider.Value>>(
  function Value(props, ref) {
    return (
      <BaseSlider.Value ref={ref} {...props} {...sx(styles.slider.value)} />
    );
  },
);
const Control = forwardRef<HTMLDivElement, P<typeof BaseSlider.Control>>(
  function Control(props, ref) {
    return (
      <BaseSlider.Control ref={ref} {...props} {...sx(styles.slider.control)} />
    );
  },
);
const Track = forwardRef<HTMLDivElement, P<typeof BaseSlider.Track>>(
  function Track(props, ref) {
    return (
      <BaseSlider.Track ref={ref} {...props} {...sx(styles.slider.track)} />
    );
  },
);
const Indicator = forwardRef<HTMLDivElement, P<typeof BaseSlider.Indicator>>(
  function Indicator(props, ref) {
    return (
      <BaseSlider.Indicator
        ref={ref}
        {...props}
        {...sx(styles.slider.indicator)}
      />
    );
  },
);
const Thumb = forwardRef<HTMLDivElement, P<typeof BaseSlider.Thumb>>(
  function Thumb(props, ref) {
    return (
      <BaseSlider.Thumb ref={ref} {...props} {...sx(styles.slider.thumb)} />
    );
  },
);
export const Slider = { Root, Label, Value, Control, Track, Indicator, Thumb };
