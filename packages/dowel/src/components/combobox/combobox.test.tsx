import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Combobox } from "./index";

const options = [
  { value: "acme", label: "Acme", group: "Organizations" },
  { value: "northstar", label: "Northstar", group: "Organizations" },
  {
    value: "archive",
    label: "Archive",
    description: "Read only",
    disabled: true,
  },
] as const;

describe("Combobox", () => {
  it("filters and selects an option", async () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        label="Organization"
        options={options}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole("combobox", { name: "Organization" });
    await userEvent.type(input, "north");
    expect(screen.queryByRole("option", { name: "Acme" })).toBeNull();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("northstar");
    expect((input as HTMLInputElement).value).toBe("Northstar");
  });

  it("submits the selected value", () => {
    const { container } = render(
      <form>
        <Combobox
          label="Organization"
          name="organization"
          options={options}
          value="acme"
        />
      </form>,
    );
    expect(
      new FormData(container.querySelector("form")!).get("organization"),
    ).toBe("acme");
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <main>
        <Combobox label="Organization" options={options} />
      </main>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Open organization options" }),
    );
    await screen.findByRole("listbox");
    await expectNoA11yViolations(container.ownerDocument.body);
  });
});
