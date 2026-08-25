import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { CommandMenu } from "./index";

function items(onSelect = vi.fn()) {
  return [
    {
      id: "repo",
      label: "Open repository",
      group: "Navigation",
      shortcut: "G R",
      onSelect,
    },
    {
      id: "settings",
      label: "Open settings",
      group: "Navigation",
      keywords: ["preferences"],
      onSelect: vi.fn(),
    },
  ];
}

describe("CommandMenu", () => {
  it("filters, runs a command, and closes", async () => {
    const onSelect = vi.fn();
    render(
      <CommandMenu
        trigger={<Button>Commands</Button>}
        items={items(onSelect)}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Commands" }));
    const input = screen.getByRole("combobox", { name: "Command menu" });
    await userEvent.type(input, "repo");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("matches keywords", async () => {
    render(<CommandMenu defaultOpen items={items()} />);
    await userEvent.type(screen.getByRole("combobox"), "preferences");
    expect(screen.getByText("Open settings")).toBeDefined();
  });

  it("has no accessibility violations when open", async () => {
    render(<CommandMenu defaultOpen items={items()} />);
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});
