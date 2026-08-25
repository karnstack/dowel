import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { ThemeProvider } from "../../theme/theme-provider";
import { PropertyPicker } from "./index";

const options = [
  {
    value: "triage",
    label: "Triage",
    description: "Needs review",
    group: "Workflow",
  },
  {
    value: "started",
    label: "In progress",
    description: "Actively being worked on",
    group: "Workflow",
  },
  {
    value: "done",
    label: "Done",
    group: "Completed",
  },
] as const;

function Example({ onValueChange = vi.fn() }: { onValueChange?: () => void }) {
  const [value, setValue] = useState<string | null>("triage");
  return (
    <PropertyPicker
      label="Status"
      name="status"
      options={options}
      value={value}
      onValueChange={(next) => {
        setValue(next);
        onValueChange();
      }}
    />
  );
}

describe("PropertyPicker", () => {
  it("shows the selected property value on its pill trigger", () => {
    render(<Example />);
    expect(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    ).toBeDefined();
  });

  it("searches grouped options and exposes an empty state", async () => {
    render(<Example />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    const input = await screen.findByRole("combobox", {
      name: "Search Status",
    });
    expect(screen.getByText("Workflow")).toBeDefined();
    await userEvent.type(input, "progress");
    expect(screen.getByRole("option", { name: /In progress/ })).toBeDefined();
    expect(screen.queryByRole("option", { name: /Triage/ })).toBeNull();
    await userEvent.clear(input);
    await userEvent.type(input, "missing");
    expect(screen.getByText("No matching options")).toBeDefined();
  });

  it("selects an option and returns focus to the renamed trigger", async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    await userEvent.click(
      await screen.findByRole("option", { name: /In progress/ }),
    );
    expect(onValueChange).toHaveBeenCalledOnce();
    const trigger = screen.getByRole("combobox", {
      name: "Status: In progress",
    });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("filters and selects from the keyboard", async () => {
    render(<Example />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    const input = await screen.findByRole("combobox", {
      name: "Search Status",
    });
    await userEvent.type(input, "progress");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    const trigger = screen.getByRole("combobox", {
      name: "Status: In progress",
    });
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("keeps one highlighted row when hovering across option groups", async () => {
    render(<Example />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    const triage = await screen.findByRole("option", { name: /Triage/ });
    const done = screen.getByRole("option", { name: /Done/ });

    await userEvent.hover(done);

    expect(done.hasAttribute("data-highlighted")).toBe(true);
    expect(triage.hasAttribute("data-highlighted")).toBe(false);
    expect(
      document.querySelectorAll(
        '[data-dowel-component="property-picker-option"][data-highlighted]',
      ),
    ).toHaveLength(1);
  });

  it("clears an optional property", async () => {
    render(<Example />);
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    await userEvent.click(
      await screen.findByRole("button", { name: "Clear status" }),
    );
    expect(screen.getByRole("combobox", { name: "Status" })).toBeDefined();
  });

  it("submits the selected string value through a native form field", () => {
    const { container } = render(
      <form>
        <PropertyPicker
          label="Status"
          name="status"
          options={options}
          value="started"
        />
      </form>,
    );
    const form = container.querySelector("form");
    expect(new FormData(form!).get("status")).toBe("started");
  });

  it("carries an explicit theme into its portal", async () => {
    render(
      <ThemeProvider theme="dark">
        <Example />
      </ThemeProvider>,
    );
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    const popup = await screen.findByRole("listbox");
    expect(popup.closest('[data-dowel-theme="dark"]')).not.toBeNull();
  });

  it("ignores appearance props smuggled onto the composite", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<PropertyPicker label="Status" options={options} {...smuggled} />);
    const trigger = screen.getByRole("combobox", { name: "Status" });
    expect(trigger.className).not.toContain("evil");
    expect(trigger.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <main>
        <Example />
      </main>,
    );
    await userEvent.click(
      screen.getByRole("combobox", { name: "Status: Triage" }),
    );
    await screen.findByRole("listbox");
    await expectNoA11yViolations(container.ownerDocument.body);
  });
});
