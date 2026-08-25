import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import * as styles from "./accordion.stylex";

type PartProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style"
>;

function sx(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

const Root = forwardRef<HTMLDivElement, PartProps<typeof BaseAccordion.Root>>(
  function AccordionRoot(props, ref) {
    return (
      <BaseAccordion.Root
        ref={ref}
        {...props}
        {...sx(styles.accordion.root)}
        data-dowel-component="accordion"
      />
    );
  },
);

const Item = forwardRef<HTMLDivElement, PartProps<typeof BaseAccordion.Item>>(
  function AccordionItem(props, ref) {
    return (
      <BaseAccordion.Item
        ref={ref}
        {...props}
        {...sx(styles.accordion.item)}
        data-dowel-part="accordion-item"
      />
    );
  },
);

const Header = forwardRef<
  HTMLHeadingElement,
  PartProps<typeof BaseAccordion.Header>
>(function AccordionHeader(props, ref) {
  return (
    <BaseAccordion.Header
      ref={ref}
      {...props}
      {...sx(styles.accordion.header)}
    />
  );
});

const Trigger = forwardRef<
  HTMLElement,
  PartProps<typeof BaseAccordion.Trigger>
>(function AccordionTrigger({ children, ...props }, ref) {
  return (
    <BaseAccordion.Trigger
      ref={ref}
      {...props}
      {...sx(styles.accordion.trigger)}
    >
      <span {...sx(styles.accordion.triggerText)}>{children}</span>
      <ChevronRightIcon
        aria-hidden="true"
        width={14}
        height={14}
        {...sx(styles.accordion.icon)}
      />
    </BaseAccordion.Trigger>
  );
});

const Panel = forwardRef<HTMLDivElement, PartProps<typeof BaseAccordion.Panel>>(
  function AccordionPanel(props, ref) {
    return (
      <BaseAccordion.Panel
        ref={ref}
        {...props}
        {...sx(styles.accordion.panel)}
        data-dowel-part="accordion-panel"
      />
    );
  },
);

const Content = forwardRef<HTMLDivElement, { children?: ReactNode }>(
  function AccordionContent(props, ref) {
    return <div ref={ref} {...props} {...sx(styles.accordion.content)} />;
  },
);

export const Accordion = { Root, Item, Header, Trigger, Panel, Content };
