import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import { useContext, useMemo, useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { DowelThemeContext, themeStyles } from "../../theme/theme-provider";
import * as styles from "./command-menu.stylex";

export interface CommandMenuItem {
  id: string;
  label: string;
  description?: string;
  group?: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  keywords?: readonly string[];
  onSelect: () => void;
}

export interface CommandMenuProps {
  label?: string;
  items: readonly CommandMenuItem[];
  trigger?: ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyText?: string;
  footer?: ReactNode;
}

type CommandGroup = {
  key: string;
  label?: string;
  items: readonly CommandMenuItem[];
};

function groupItems(items: readonly CommandMenuItem[]): CommandGroup[] {
  const groups = new Map<string, CommandMenuItem[]>();
  for (const item of items) {
    const key = item.group ?? "";
    const group = groups.get(key);
    if (group) group.push(item);
    else groups.set(key, [item]);
  }
  return Array.from(groups, ([key, groupedItems]) => ({
    key: key || "__ungrouped",
    label: key || undefined,
    items: groupedItems,
  }));
}

function sx(...values: stylex.StyleXStyles[]) {
  const resolved = stylex.props(...values);
  return { className: resolved.className, style: resolved.style };
}

export function CommandMenu({
  label = "Command menu",
  items,
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Type a command or search",
  emptyText = "No matching commands",
  footer,
}: CommandMenuProps) {
  const theme = useContext(DowelThemeContext);
  const portalTheme = stylex.props(themeStyles[theme]);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const currentOpen = open === undefined ? uncontrolledOpen : open;
  const groups = useMemo(() => groupItems(items), [items]);

  function changeOpen(nextOpen: boolean) {
    if (open === undefined) setUncontrolledOpen(nextOpen);
    if (!nextOpen) setQuery("");
    onOpenChange?.(nextOpen);
  }

  function select(item: CommandMenuItem) {
    item.onSelect();
    changeOpen(false);
  }

  return (
    <BaseDialog.Root open={currentOpen} onOpenChange={changeOpen}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal
        className={portalTheme.className}
        style={portalTheme.style}
        data-dowel-theme={theme}
      >
        <BaseDialog.Backdrop {...sx(styles.command.backdrop)} />
        <BaseDialog.Popup
          {...sx(styles.command.popup)}
          data-dowel-component="command-menu"
        >
          <BaseDialog.Title render={<span />} {...sx(styles.command.title)}>
            {label}
          </BaseDialog.Title>
          <BaseAutocomplete.Root
            items={groups}
            value={query}
            onValueChange={(nextQuery) => setQuery(nextQuery)}
            itemToStringValue={(item) =>
              [item.label, item.description, ...(item.keywords ?? [])]
                .filter(Boolean)
                .join(" ")
            }
            autoHighlight="always"
            inline
            open
          >
            <BaseAutocomplete.InputGroup {...sx(styles.command.search)}>
              <MagnifyingGlassIcon
                {...sx(styles.command.searchIcon)}
                width={18}
                height={18}
              />
              <BaseAutocomplete.Input
                {...sx(styles.command.input)}
                aria-label={label}
                placeholder={placeholder}
                autoFocus
              />
            </BaseAutocomplete.InputGroup>
            <BaseAutocomplete.Empty>
              <div {...sx(styles.command.empty)}>{emptyText}</div>
            </BaseAutocomplete.Empty>
            <BaseAutocomplete.List {...sx(styles.command.list)}>
              {(group: CommandGroup) => (
                <BaseAutocomplete.Group key={group.key} items={group.items}>
                  {group.label ? (
                    <BaseAutocomplete.GroupLabel
                      {...sx(styles.command.groupLabel)}
                    >
                      {group.label}
                    </BaseAutocomplete.GroupLabel>
                  ) : null}
                  <BaseAutocomplete.Collection>
                    {(item: CommandMenuItem) => (
                      <BaseAutocomplete.Item
                        key={item.id}
                        value={item}
                        disabled={item.disabled}
                        onClick={() => select(item)}
                        {...sx(styles.command.item)}
                      >
                        {item.icon ? (
                          <span
                            {...sx(styles.command.itemIcon)}
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                        ) : null}
                        <span {...sx(styles.command.itemCopy)}>
                          <span {...sx(styles.command.itemLabel)}>
                            {item.label}
                          </span>
                          {item.description ? (
                            <span {...sx(styles.command.itemDescription)}>
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                        {item.shortcut ? (
                          <span
                            {...sx(styles.command.shortcut)}
                            aria-label={`Shortcut ${item.shortcut}`}
                          >
                            {item.shortcut}
                          </span>
                        ) : null}
                      </BaseAutocomplete.Item>
                    )}
                  </BaseAutocomplete.Collection>
                </BaseAutocomplete.Group>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Root>
          {footer ? <div {...sx(styles.command.footer)}>{footer}</div> : null}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
