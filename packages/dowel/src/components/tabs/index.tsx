import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as stylex from "@stylexjs/stylex";
import { createContext, forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import * as styles from "./tabs.stylex";

type PartProps<T extends ElementType> = Omit<
  ComponentPropsWithoutRef<T>,
  "className" | "style"
>;

export type TabsVariant = "pill" | "line";
export type TabsSize = "sm" | "md";

type TabsAppearance = {
  size: TabsSize;
  variant: TabsVariant;
};

const TabsAppearanceContext = createContext<TabsAppearance>({
  size: "md",
  variant: "pill",
});

export interface TabsRootProps extends PartProps<typeof BaseTabs.Root> {
  /** Control height. `sm` is 24px, `md` is 28px. Defaults to `md`. */
  size?: TabsSize;
  /** Visual treatment. Defaults to the compact `pill` style. */
  variant?: TabsVariant;
}

function partProps(...style: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...style);
  return { className: resolved.className, style: resolved.style };
}

const Root = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot(
  { size = "md", variant = "pill", ...props },
  ref,
) {
  return (
    <TabsAppearanceContext.Provider value={{ size, variant }}>
      <BaseTabs.Root
        ref={ref}
        {...props}
        {...partProps(styles.parts.root)}
        data-dowel-component="tabs-root"
        data-size={size}
        data-variant={variant}
      />
    </TabsAppearanceContext.Provider>
  );
});

const List = forwardRef<HTMLDivElement, PartProps<typeof BaseTabs.List>>(
  function TabsList({ activateOnFocus = true, ...props }, ref) {
    const { variant } = useContext(TabsAppearanceContext);

    return (
      <BaseTabs.List
        ref={ref}
        activateOnFocus={activateOnFocus}
        {...props}
        {...partProps(
          styles.parts.list,
          variant === "pill"
            ? styles.variant.pillList
            : styles.variant.lineList,
        )}
        data-dowel-component="tabs-list"
      />
    );
  },
);

const Tab = forwardRef<HTMLElement, PartProps<typeof BaseTabs.Tab>>(
  function TabsTab(props, ref) {
    const { size, variant } = useContext(TabsAppearanceContext);

    return (
      <BaseTabs.Tab
        ref={ref}
        {...props}
        {...partProps(
          styles.parts.tab,
          styles.size[size],
          variant === "pill" ? styles.variant.pillTab : styles.variant.lineTab,
        )}
        data-dowel-component="tabs-tab"
      />
    );
  },
);

const Panel = forwardRef<HTMLDivElement, PartProps<typeof BaseTabs.Panel>>(
  function TabsPanel(props, ref) {
    return (
      <BaseTabs.Panel
        ref={ref}
        {...props}
        {...partProps(styles.parts.panel)}
        data-dowel-component="tabs-panel"
      />
    );
  },
);

export const Tabs = { Root, List, Tab, Panel };
