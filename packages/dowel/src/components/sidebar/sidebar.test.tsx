import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Sidebar } from "./index";

function Example({
  onWidthChange,
}: {
  onWidthChange?: (width: number) => void;
}) {
  return (
    <Sidebar.Root
      aria-label="Workspace layout"
      defaultWidth={224}
      minWidth={192}
      maxWidth={280}
      onWidthChange={onWidthChange}
    >
      <Sidebar.Panel aria-label="Workspace navigation">
        <Sidebar.Header>Workspace</Sidebar.Header>
        <Sidebar.Body>Navigation</Sidebar.Body>
        <Sidebar.Footer>Account</Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeHandle />
      <Sidebar.Content>Main content</Sidebar.Content>
    </Sidebar.Root>
  );
}

describe("Sidebar", () => {
  it("renders a labelled panel, content region, and resize separator", () => {
    render(<Example />);
    expect(
      screen.getByRole("complementary", { name: "Workspace navigation" }),
    ).toBeDefined();
    expect(screen.getByText("Main content")).toBeDefined();
    const handle = screen.getByRole("separator", { name: "Resize sidebar" });
    expect(handle.getAttribute("aria-valuenow")).toBe("224");
    expect(handle.getAttribute("aria-valuemin")).toBe("192");
    expect(handle.getAttribute("aria-valuemax")).toBe("280");
  });

  it("resizes with arrow, Home, and End keys", async () => {
    const onWidthChange = vi.fn();
    render(<Example onWidthChange={onWidthChange} />);
    const handle = screen.getByRole("separator");
    handle.focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(handle.getAttribute("aria-valuenow")).toBe("232");
    await userEvent.keyboard("{End}");
    expect(handle.getAttribute("aria-valuenow")).toBe("280");
    await userEvent.keyboard("{Home}");
    expect(handle.getAttribute("aria-valuenow")).toBe("192");
    expect(onWidthChange).toHaveBeenLastCalledWith(192);
  });

  it("resizes with pointer movement", () => {
    render(<Example />);
    const handle = screen.getByRole("separator");
    Object.defineProperties(handle, {
      setPointerCapture: { value: vi.fn() },
      hasPointerCapture: { value: vi.fn(() => true) },
      releasePointerCapture: { value: vi.fn() },
    });

    fireEvent.pointerDown(handle, { button: 0, clientX: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientX: 124, pointerId: 1 });
    expect(handle.getAttribute("aria-valuenow")).toBe("248");
    fireEvent.pointerUp(handle, { clientX: 124, pointerId: 1 });
    expect(handle.hasAttribute("data-resizing")).toBe(false);
  });

  it("restores the default width on double click", async () => {
    render(<Example />);
    const handle = screen.getByRole("separator");
    handle.focus();
    await userEvent.keyboard("{End}");
    await userEvent.dblClick(handle);
    expect(handle.getAttribute("aria-valuenow")).toBe("224");
  });

  it("merges application layout hooks on the root", () => {
    render(<Sidebar.Root className="app-shell">Content</Sidebar.Root>);
    const root = document.querySelector('[data-dowel-component="sidebar"]');
    expect(root?.className).toContain("app-shell");
    expect(root?.className.length).toBeGreaterThan("app-shell".length);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
