import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { ThemeProvider } from "../../theme/theme-provider";
import { Button } from "../button";
import { Dialog } from "./index";

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button>Open</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Delete issue</Dialog.Title>
            <Dialog.Description>This cannot be undone.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button>Cancel</Button>} />
          </Dialog.Footer>
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

  it("carries StyleX classes and anatomy markers on every styled part", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    for (const part of [
      "dialog-backdrop",
      "dialog-popup",
      "dialog-header",
      "dialog-footer",
      "dialog-title",
      "dialog-description",
    ]) {
      const element = document.querySelector(
        `[data-dowel-component="${part}"]`,
      );
      expect(element, part).not.toBeNull();
      expect(element?.className, part).not.toBe("");
    }
    expect(dialog.dataset.variant).toBe("default");
  });

  it("offers a bare popup host for composite surfaces", () => {
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup variant="bare">
            <Dialog.Title>Composite</Dialog.Title>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    expect(screen.getByRole("dialog").dataset.variant).toBe("bare");
  });

  it("carries the active theme into its body-level portal", () => {
    render(
      <ThemeProvider theme="dark">
        <Dialog.Root defaultOpen>
          <Dialog.Portal data-testid="portal">
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Themed dialog</Dialog.Title>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </ThemeProvider>,
    );
    expect(screen.getByTestId("portal").dataset.dowelTheme).toBe("dark");
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
    // Trigger and Close are used bare (no `render`): that path renders Base
    // UI's own native <button>, where a smuggled className/style would land
    // directly — the render={<Button/>} path is already covered by Button's
    // own after-spread discipline. Portal renders a real <div> whose inline
    // style could create a containing block (transform/filter) and break the
    // popup's position: fixed, so its channels matter structurally.
    render(
      <Dialog.Root defaultOpen>
        <Dialog.Trigger {...smuggle("s-trigger")}>Open</Dialog.Trigger>
        <Dialog.Portal {...smuggle("s-portal")}>
          <Dialog.Backdrop {...smuggle("s-backdrop")} />
          <Dialog.Popup {...smuggle("s-popup")}>
            <Dialog.Header {...smuggle("s-header")}>
              <Dialog.Title {...smuggle("s-title")}>Delete issue</Dialog.Title>
              <Dialog.Description {...smuggle("s-description")}>
                This cannot be undone.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body {...smuggle("s-body")}>Body</Dialog.Body>
            <Dialog.Footer {...smuggle("s-footer")}>Footer</Dialog.Footer>
            <Dialog.Close {...smuggle("s-close")}>Cancel</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>,
    );
    for (const [id, styled] of [
      ["s-trigger", null],
      ["s-portal", true],
      ["s-backdrop", true],
      ["s-popup", true],
      ["s-header", true],
      ["s-body", true],
      ["s-footer", true],
      ["s-title", true],
      ["s-description", true],
      ["s-close", null],
    ] as const) {
      // The surviving `id` is how each part is found: it proves functional
      // props pass through while the appearance channels are stripped.
      const el = document.getElementById(id);
      expect(el, id).not.toBeNull();
      if (styled) {
        expect(el!.className, id).not.toBe("");
      }
      expect(el!.className, id).not.toContain("evil");
      expect(el!.style.color, id).toBe("");
    }
  });

  // Full tab-cycle focus trapping is deliberately NOT tested: userEvent.tab()
  // bypasses Base UI's focus guards, so such a test could not prove anything.
  // Focus return is assertable and is a top-three dialog accessibility defect.
  it("moves focus into the popup on open and returns it on Escape", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    // Base UI moves initial focus asynchronously, so poll. The trigger sits
    // outside the dialog, so containment failing (or timing out) means focus
    // never left it — the assertion cannot pass vacuously.
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("returns focus to the trigger when closed via the Close control", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(document.activeElement).toBe(trigger));
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
