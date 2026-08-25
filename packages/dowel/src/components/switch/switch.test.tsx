import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderBoth } from "../../../test/render";
import { expectNoA11yViolations } from "../../../test/setup";
import { Switch } from "./index";

function LabelledSwitch(props: React.ComponentProps<typeof Switch>) {
  return (
    <label>
      <Switch {...props} /> Require signed commits
    </label>
  );
}

describe("Switch", () => {
  it("toggles with pointer input", async () => {
    const onCheckedChange = vi.fn();
    render(<LabelledSwitch onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch", {
      name: "Require signed commits",
    });
    await userEvent.click(control);
    expect(control.getAttribute("aria-checked")).toBe("true");
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("toggles with the space key", async () => {
    render(<LabelledSwitch />);
    const control = screen.getByRole("switch");
    control.focus();
    await userEvent.keyboard(" ");
    expect(control.getAttribute("aria-checked")).toBe("true");
  });

  it("does not toggle when disabled", async () => {
    render(<LabelledSwitch disabled />);
    const control = screen.getByRole("switch");
    await userEvent.click(control);
    expect(control.getAttribute("aria-checked")).toBe("false");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Switch aria-label="Enabled" {...smuggled} />);
    const control = screen.getByRole("switch");
    expect(control.className).not.toContain("evil");
    expect(control.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Switch aria-label="Enabled" />);
    expect(
      light.querySelector('[data-dowel-component="switch"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="switch"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LabelledSwitch />);
    await expectNoA11yViolations(container);
  });
});
