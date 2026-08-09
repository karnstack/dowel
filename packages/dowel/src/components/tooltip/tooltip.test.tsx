import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "../icon-button";
import { Tooltip } from "./index";

function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <IconButton label="Copy link">
              <svg aria-hidden="true" width="14" height="14" />
            </IconButton>
          }
        />
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>Copy link</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

describe("Tooltip", () => {
  it("is hidden until the trigger is hovered", () => {
    render(<Example />);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("keeps the trigger independently labelled while the tooltip is hidden", () => {
    // Base UI's documented design stance (their shipped
    // docs/react/components/tooltip.md, "Usage guidelines"): a tooltip is a
    // visual label only — not accessible to touch or screen reader users —
    // so the TRIGGER must carry an accessible name closely matching the
    // tooltip's content. In the canonical usage IconButton's required
    // `label` guarantees that structurally; this pins the guarantee. The
    // role+name query runs the full accessible-name computation and throws
    // for an unlabelled trigger, so a regression fails here. Asserted with
    // the tooltip closed deliberately: the name must exist without the
    // popup, because assistive tech never sees the popup.
    render(<Example />);
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(screen.getByRole("button", { name: "Copy link" })).toBeDefined();
  });

  // Base UI opens the tooltip asynchronously (the trigger's hover delay runs
  // on a real timer; focus opens on the next tick). findByRole polls and its
  // timeout is a failure, so none of these can pass without the tooltip
  // actually appearing.
  it("appears on hover", async () => {
    render(<Example />);
    await userEvent.hover(screen.getByRole("button", { name: "Copy link" }));
    expect(await screen.findByRole("tooltip")).toBeDefined();
  });

  it("appears on keyboard focus", async () => {
    render(<Example />);
    await userEvent.tab();
    expect(await screen.findByRole("tooltip")).toBeDefined();
  });

  it("disappears on unhover", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Copy link" });
    await userEvent.hover(trigger);
    // The open must land BEFORE the unhover — otherwise the final null
    // assertion passes vacuously against a tooltip that never appeared.
    await screen.findByRole("tooltip");
    await userEvent.unhover(trigger);
    // waitFor polls until the popup unmounts; while the trigger stays
    // hovered the tooltip never closes, so this times out (fails) if the
    // unhover above is removed.
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
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
      <Tooltip.Provider>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger {...smuggle("s-trigger")}>Copy</Tooltip.Trigger>
          <Tooltip.Portal {...smuggle("s-portal")}>
            <Tooltip.Positioner {...smuggle("s-positioner")}>
              <Tooltip.Popup {...smuggle("s-popup")}>Copy link</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>,
    );
    await screen.findByRole("tooltip");
    for (const [id, dowelClass] of [
      ["s-trigger", null],
      ["s-portal", null],
      ["s-positioner", null],
      ["s-popup", "dowel-tooltip"],
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
      await userEvent.hover(screen.getByRole("button", { name: "Copy link" }));
      await screen.findByRole("tooltip");
      expect(error.mock.calls).toEqual([]);
      expect(warn.mock.calls).toEqual([]);
    } finally {
      error.mockRestore();
      warn.mockRestore();
    }
  });
});
