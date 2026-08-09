import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Dialog } from "./index";

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Delete issue</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <Dialog.Close render={<Button>Cancel</Button>} />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("is closed until the trigger is activated", () => {
    render(<Example />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens on trigger click and is labelled by its title", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog", { name: "Delete issue" })).toBeDefined();
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes via the Close control", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("carries the dowel classes on every styled part", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("dowel-dialog");
    expect(document.querySelector(".dowel-backdrop")).not.toBeNull();
    expect(dialog.querySelector(".dowel-dialog-title")).not.toBeNull();
    expect(dialog.querySelector(".dowel-dialog-description")).not.toBeNull();
  });

  it("ignores className and style smuggled through a spread", async () => {
    // Part props Omit className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    // `id` rides along for two reasons: it gives the otherwise-empty Backdrop
    // spread a property in common with the part's all-optional props (TS2559
    // rejects a spread with none), and it proves functional props survive the
    // spread while appearance is stripped. Base UI sets its own internal
    // inline styles on Backdrop (user-select) and Popup (--nested-dialogs),
    // so assert the smuggled declaration is absent rather than that the style
    // attribute is empty.
    const smuggle = (id: string) => ({
      id,
      className: "evil",
      style: { color: "red" },
    });
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Backdrop {...smuggle("s-backdrop")} />
          <Dialog.Popup {...smuggle("s-popup")}>
            <Dialog.Title {...smuggle("s-title")}>Delete issue</Dialog.Title>
            <Dialog.Description {...smuggle("s-description")}>
              This cannot be undone.
            </Dialog.Description>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    for (const [selector, id] of [
      [".dowel-backdrop", "s-backdrop"],
      [".dowel-dialog", "s-popup"],
      [".dowel-dialog-title", "s-title"],
      [".dowel-dialog-description", "s-description"],
    ] as const) {
      const el = document.querySelector<HTMLElement>(selector);
      expect(el, selector).not.toBeNull();
      expect(el!.id, selector).toBe(id);
      expect(el!.className, selector).not.toContain("evil");
      expect(el!.style.color, selector).toBe("");
    }
  });

  it("opens without console errors or warnings", async () => {
    // Vitest 4 intercepts console output, so a visually clean run proves
    // nothing — spy and assert.
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      render(<Example />);
      await userEvent.click(screen.getByRole("button", { name: "Open" }));
      expect(error.mock.calls).toEqual([]);
      expect(warn.mock.calls).toEqual([]);
    } finally {
      error.mockRestore();
      warn.mockRestore();
    }
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});
