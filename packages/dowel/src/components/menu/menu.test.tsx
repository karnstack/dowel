import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Menu } from "./index";

function Example({ onSelect = () => {} }: { onSelect?: () => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger render={<Button>Actions</Button>} />
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item onClick={onSelect}>Duplicate</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Delete</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

describe("Menu", () => {
  it("is closed until triggered", () => {
    render(<Example />);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  // Base UI opens the menu one animation frame after mousedown (useClick
  // defers setOpen to a rAF), so the popup is NOT in the DOM when
  // userEvent.click resolves. findByRole polls; its timeout is a failure, so
  // none of these can pass without the menu actually opening.
  it("opens on trigger click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    expect(await screen.findByRole("menu")).toBeDefined();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("invokes the item handler on click", async () => {
    const onSelect = vi.fn();
    render(<Example onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await userEvent.click(
      await screen.findByRole("menuitem", { name: "Duplicate" }),
    );
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    // Wait for the open to land first — otherwise this passes vacuously.
    await screen.findByRole("menu");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("moves focus with the arrow keys", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menu");
    await userEvent.keyboard("{ArrowDown}");
    // Base UI moves item focus asynchronously, so poll. A timeout is a
    // failure, so the assertion cannot pass vacuously.
    await waitFor(() =>
      expect(document.activeElement?.textContent).toBe("Duplicate"),
    );
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(document.activeElement?.textContent).toBe("Delete"),
    );
  });

  it("returns focus to the trigger on Escape", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    await userEvent.click(trigger);
    await screen.findByRole("menu");
    await userEvent.keyboard("{ArrowDown}");
    // Focus must actually enter the menu first, or the final assertion could
    // pass without focus ever having left the trigger.
    await waitFor(() =>
      expect(document.activeElement?.textContent).toBe("Duplicate"),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("carries the dowel classes on every styled part", async () => {
    render(
      <Menu.Root defaultOpen>
        <Menu.Trigger render={<Button>Actions</Button>} />
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Group>
                <Menu.GroupLabel>Edit</Menu.GroupLabel>
                <Menu.Item>Duplicate</Menu.Item>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Item>Delete</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>,
    );
    const menu = screen.getByRole("menu");
    expect(menu.className).toContain("dowel-menu");
    expect(menu.querySelectorAll(".dowel-menu-item")).toHaveLength(2);
    expect(menu.querySelector(".dowel-menu-separator")).not.toBeNull();
    expect(menu.querySelector(".dowel-menu-label")).not.toBeNull();
  });

  it("ignores className and style smuggled through a spread", async () => {
    // Part props Omit className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    // `id` rides along for two reasons: it gives the otherwise-empty spreads
    // a property in common with a part's all-optional props (TS2559 rejects a
    // spread with none), and it proves functional props survive the spread
    // while appearance is stripped. Base UI sets its own inline styles on
    // Positioner (floating-ui placement) and Popup, so assert the smuggled
    // DECLARATION is absent rather than that the style attribute is empty.
    const smuggle = (id: string) => ({
      id,
      className: "evil",
      style: { color: "red" },
    });
    // Trigger is used bare (no `render`): that path renders Base UI's own
    // native <button>, where a smuggled className/style would land directly.
    // Portal renders a real <div> whose inline style could create a
    // containing block (transform/filter) and break the popup's positioning,
    // so its channels matter structurally even though it has no class.
    render(
      <Menu.Root defaultOpen>
        <Menu.Trigger {...smuggle("s-trigger")}>Actions</Menu.Trigger>
        <Menu.Portal {...smuggle("s-portal")}>
          <Menu.Positioner {...smuggle("s-positioner")}>
            <Menu.Popup {...smuggle("s-popup")}>
              <Menu.Group {...smuggle("s-group")}>
                <Menu.GroupLabel {...smuggle("s-label")}>Edit</Menu.GroupLabel>
                <Menu.Item {...smuggle("s-item")}>Duplicate</Menu.Item>
              </Menu.Group>
              <Menu.Separator {...smuggle("s-separator")} />
              <Menu.Item>Delete</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>,
    );
    for (const [id, dowelClass] of [
      ["s-trigger", null],
      ["s-portal", null],
      ["s-positioner", null],
      ["s-popup", "dowel-menu"],
      ["s-group", null],
      ["s-label", "dowel-menu-label"],
      ["s-item", "dowel-menu-item"],
      ["s-separator", "dowel-menu-separator"],
    ] as const) {
      // The surviving `id` is how each part is found: it proves functional
      // props pass through while the appearance channels are stripped.
      const el = document.getElementById(id);
      expect(el, id).not.toBeNull();
      if (dowelClass) {
        expect(el!.className, id).toContain(dowelClass);
      }
      expect(el!.className, id).not.toContain("evil");
      expect(el!.style.color, id).toBe("");
    }
  });

  it("opens without console errors or warnings", async () => {
    // Vitest 4 intercepts console output, so a visually clean run proves
    // nothing — spy and assert.
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      render(<Example />);
      await userEvent.click(screen.getByRole("button", { name: "Actions" }));
      await screen.findByRole("menu");
      expect(error.mock.calls).toEqual([]);
      expect(warn.mock.calls).toEqual([]);
    } finally {
      error.mockRestore();
      warn.mockRestore();
    }
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Actions" }));
    await expectNoA11yViolations(await screen.findByRole("menu"));
  });
});
