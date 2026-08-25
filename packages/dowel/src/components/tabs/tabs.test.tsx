import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Tabs } from "./index";

function Example({ onValueChange }: { onValueChange?: () => void }) {
  return (
    <Tabs.Root defaultValue="assigned" onValueChange={onValueChange}>
      <Tabs.List aria-label="Issue views">
        <Tabs.Tab value="assigned">Assigned</Tabs.Tab>
        <Tabs.Tab value="created">Created</Tabs.Tab>
        <Tabs.Tab value="subscribed">Subscribed</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="assigned">Assigned issues</Tabs.Panel>
      <Tabs.Panel value="created">Created issues</Tabs.Panel>
      <Tabs.Panel value="subscribed">Subscribed issues</Tabs.Panel>
    </Tabs.Root>
  );
}

describe("Tabs", () => {
  it("connects the selected tab to its panel", () => {
    render(<Example />);
    expect(
      screen
        .getByRole("tab", { name: "Assigned" })
        .getAttribute("aria-selected"),
    ).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toBe("Assigned issues");
  });

  it("changes panels on click", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("tab", { name: "Created" }));
    expect(screen.getByRole("tabpanel").textContent).toBe("Created issues");
  });

  it("activates tabs as arrow-key focus moves", async () => {
    render(<Example />);
    const assigned = screen.getByRole("tab", { name: "Assigned" });
    const created = screen.getByRole("tab", { name: "Created" });
    assigned.focus();
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() => expect(document.activeElement).toBe(created));
    expect(created.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel").textContent).toBe("Created issues");
  });

  it("allows disabled tabs to receive focus without activating them", async () => {
    render(
      <Tabs.Root defaultValue="one">
        <Tabs.List aria-label="Views">
          <Tabs.Tab value="one">One</Tabs.Tab>
          <Tabs.Tab value="two" disabled>
            Two
          </Tabs.Tab>
          <Tabs.Tab value="three">Three</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">First</Tabs.Panel>
        <Tabs.Panel value="two">Second</Tabs.Panel>
        <Tabs.Panel value="three">Third</Tabs.Panel>
      </Tabs.Root>,
    );
    screen.getByRole("tab", { name: "One" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("tab", { name: "Two" }),
      ),
    );
    expect(screen.getByRole("tabpanel").textContent).toBe("First");
  });

  it("reports value changes", async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Subscribed" }));
    expect(onValueChange).toHaveBeenCalledWith("subscribed", expect.anything());
  });

  it("supports the line treatment and compact size", () => {
    render(
      <Tabs.Root defaultValue="one" size="sm" variant="line">
        <Tabs.List aria-label="Views">
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">First</Tabs.Panel>
      </Tabs.Root>,
    );
    const root = document.querySelector('[data-dowel-component="tabs-root"]');
    expect(root?.getAttribute("data-size")).toBe("sm");
    expect(root?.getAttribute("data-variant")).toBe("line");
  });

  it("keeps appearance props private on every styled part", () => {
    const smuggled = {
      className: "evil",
      style: { color: "red" },
    };
    render(
      <Tabs.Root defaultValue="one" {...smuggled}>
        <Tabs.List aria-label="Views" {...smuggled}>
          <Tabs.Tab value="one" {...smuggled}>
            One
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one" {...smuggled}>
          First
        </Tabs.Panel>
      </Tabs.Root>,
    );
    for (const part of ["tabs-root", "tabs-list", "tabs-tab", "tabs-panel"]) {
      const element = document.querySelector(
        `[data-dowel-component="${part}"]`,
      );
      expect(element?.className, part).not.toContain("evil");
      expect((element as HTMLElement | null)?.style.color, part).toBe("");
    }
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Example />);
    expect(
      light.querySelector('[data-dowel-component="tabs-list"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="tabs-list"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
