import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { ThemeProvider } from "../../theme/theme-provider";
import { Select } from "./index";

const options = [
  { value: "github", label: "GitHub", group: "Cloud" },
  { value: "gitlab", label: "GitLab", group: "Cloud" },
  {
    value: "self-hosted",
    label: "Self-hosted",
    description: "Connect an internal Git server",
    group: "Advanced",
  },
] as const;

function Example({ onValueChange = vi.fn() }: { onValueChange?: () => void }) {
  const [value, setValue] = useState<string | null>("github");
  return (
    <Select
      label="Git provider"
      options={options}
      value={value}
      onValueChange={(nextValue) => {
        setValue(nextValue);
        onValueChange();
      }}
    />
  );
}

describe("Select", () => {
  it("opens grouped options and changes the value", async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Git provider" });
    expect(trigger.textContent).toContain("GitHub");

    await userEvent.click(trigger);
    expect(await screen.findByText("Cloud")).toBeDefined();
    await userEvent.click(screen.getByRole("option", { name: "GitLab" }));
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(trigger.textContent).toContain("GitLab");
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("submits the selected value through a hidden form control", () => {
    const { container } = render(
      <form>
        <Select
          label="Git provider"
          name="provider"
          options={options}
          value="self-hosted"
        />
      </form>,
    );
    const form = container.querySelector("form");
    expect(new FormData(form!).get("provider")).toBe("self-hosted");
  });

  it("carries the active theme into its portal", async () => {
    render(
      <ThemeProvider theme="light">
        <Example />
      </ThemeProvider>,
    );
    await userEvent.click(
      screen.getByRole("combobox", { name: "Git provider" }),
    );
    const listbox = await screen.findByRole("listbox");
    expect(listbox.closest('[data-dowel-theme="light"]')).not.toBeNull();
  });

  it("ignores appearance props smuggled onto the composite", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Select label="Git provider" options={options} {...smuggled} />);
    const trigger = screen.getByRole("combobox", { name: "Git provider" });
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
      screen.getByRole("combobox", { name: "Git provider" }),
    );
    await screen.findByRole("listbox");
    await expectNoA11yViolations(container.ownerDocument.body);
  });
});
