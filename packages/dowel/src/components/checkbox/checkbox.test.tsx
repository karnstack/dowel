import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { renderBoth } from "../../../test/render";
import { expectNoA11yViolations } from "../../../test/setup";
import { Checkbox, CheckboxGroup } from "./index";

function LabelledCheckbox(props: React.ComponentProps<typeof Checkbox>) {
  return (
    <label>
      <Checkbox {...props} /> Include archived repositories
    </label>
  );
}

describe("Checkbox", () => {
  it("toggles and reports its checked value", async () => {
    const onCheckedChange = vi.fn();
    render(<LabelledCheckbox onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox", {
      name: "Include archived repositories",
    });

    await userEvent.click(checkbox);
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("exposes the indeterminate state", () => {
    render(<LabelledCheckbox indeterminate />);
    expect(screen.getByRole("checkbox").getAttribute("aria-checked")).toBe(
      "mixed",
    );
  });

  it("submits native form values", async () => {
    const submitted = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitted(Object.fromEntries(new FormData(event.currentTarget)));
        }}
      >
        <LabelledCheckbox name="archived" value="include" defaultChecked />
        <button type="submit">Save</button>
      </form>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(submitted).toHaveBeenCalledWith({ archived: "include" });
  });

  it("coordinates values through CheckboxGroup", async () => {
    const onValueChange = vi.fn();
    render(
      <CheckboxGroup onValueChange={onValueChange}>
        <label>
          <Checkbox value="native" /> Native
        </label>
        <label>
          <Checkbox value="mirror" /> Mirror
        </label>
      </CheckboxGroup>,
    );
    await userEvent.click(screen.getByRole("checkbox", { name: "Mirror" }));
    expect(onValueChange).toHaveBeenCalledWith(["mirror"], expect.anything());
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Checkbox aria-label="Private" {...smuggled} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.className).not.toContain("evil");
    expect(checkbox.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Checkbox aria-label="Private" />);
    expect(
      light.querySelector('[data-dowel-component="checkbox"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="checkbox"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<LabelledCheckbox />);
    await expectNoA11yViolations(container);
  });
});
