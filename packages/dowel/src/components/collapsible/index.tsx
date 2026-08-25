import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import * as styles from "./collapsible.stylex";

type PartProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style"
>;
function sx(...values: stylex.StyleXStyles[]) {
  const r = stylex.props(...values);
  return { className: r.className, style: r.style };
}

const Root = forwardRef<HTMLDivElement, PartProps<typeof BaseCollapsible.Root>>(
  function Root(props, ref) {
    return (
      <BaseCollapsible.Root
        ref={ref}
        {...props}
        {...sx(styles.collapsible.root)}
        data-dowel-component="collapsible"
      />
    );
  },
);
const Trigger = forwardRef<
  HTMLButtonElement,
  PartProps<typeof BaseCollapsible.Trigger>
>(function Trigger({ children, ...props }, ref) {
  return (
    <BaseCollapsible.Trigger
      ref={ref}
      {...props}
      {...sx(styles.collapsible.trigger)}
    >
      <span>{children}</span>
      <ChevronRightIcon
        width={14}
        height={14}
        aria-hidden="true"
        {...sx(styles.collapsible.icon)}
      />
    </BaseCollapsible.Trigger>
  );
});
const Panel = forwardRef<
  HTMLDivElement,
  PartProps<typeof BaseCollapsible.Panel>
>(function Panel(props, ref) {
  return (
    <BaseCollapsible.Panel
      ref={ref}
      {...props}
      {...sx(styles.collapsible.panel)}
      data-dowel-part="collapsible-panel"
    />
  );
});
const Content = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  function Content(props, ref) {
    return <div ref={ref} {...props} {...sx(styles.collapsible.content)} />;
  },
);
export const Collapsible = { Root, Trigger, Panel, Content };
