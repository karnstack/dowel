import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderBoth } from "../../../test/render";
import { expectNoA11yViolations } from "../../../test/setup";
import { RadioGroup } from "./index";

function Example({ onValueChange }: { onValueChange?: () => void }) {
  return (
    <RadioGroup.Root
      aria-label="Repository visibility"
      defaultValue="private"
      name="visibility"
      onValueChange={onValueChange}
    >
      <label>
        <RadioGroup.Item value="private" /> Private
      </label>
      <label>
        <RadioGroup.Item value="internal" /> Internal
      </label>
      <label>
        <RadioGroup.Item value="public" /> Public
      </label>
    </RadioGroup.Root>
  );
}

describe("RadioGroup", () => {
  it("connects labelled radio options to one group", () => {
    render(<Example />);
    expect(
      screen
        .getByRole("radio", { name: "Private" })
        .getAttribute("aria-checked"),
    ).toBe("true");
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("changes value with pointer input", async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Internal" }));
    expect(onValueChange).toHaveBeenCalledWith("internal", expect.anything());
  });

  it("moves selection with arrow keys", async () => {
    render(<Example />);
    const selected = screen.getByRole("radio", { name: "Private" });
    selected.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(
      screen
        .getByRole("radio", { name: "Internal" })
        .getAttribute("aria-checked"),
    ).toBe("true");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(
      <RadioGroup.Root aria-label="Mode" defaultValue="one" {...smuggled}>
        <RadioGroup.Item value="one" aria-label="One" {...smuggled} />
      </RadioGroup.Root>,
    );
    for (const part of ["radio-group", "radio"]) {
      const element = document.querySelector(
        `[data-dowel-component="${part}"]`,
      );
      expect(element?.className).not.toContain("evil");
      expect(element?.getAttribute("style")).toBeNull();
    }
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Example />);
    expect(
      light.querySelector('[data-dowel-component="radio-group"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="radio-group"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
