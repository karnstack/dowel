import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Field } from "../input";
import { NativeSelect } from "./index";

describe("NativeSelect", () => {
  it("submits through the native form contract", () => {
    const { container } = render(
      <form>
        <NativeSelect
          aria-label="Provider"
          name="provider"
          defaultValue="github"
        >
          <option value="github">GitHub</option>
          <option value="gitlab">GitLab</option>
        </NativeSelect>
      </form>,
    );
    const form = container.querySelector("form");
    expect(new FormData(form!).get("provider")).toBe("github");
  });

  it("integrates with Field and exposes invalid state", () => {
    render(
      <Field.Root>
        <Field.Label>Default branch</Field.Label>
        <NativeSelect invalid defaultValue="main">
          <option value="main">main</option>
        </NativeSelect>
      </Field.Root>,
    );
    expect(
      screen
        .getByRole("combobox", { name: "Default branch" })
        .getAttribute("aria-invalid"),
    ).toBe("true");
  });

  it("ignores appearance props smuggled onto the control", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(
      <NativeSelect aria-label="Provider" {...smuggled}>
        <option>GitHub</option>
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox", { name: "Provider" });
    expect(select.className).not.toContain("evil");
    expect(select.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <NativeSelect aria-label="Provider">
          <option>GitHub</option>
          <option>GitLab</option>
        </NativeSelect>
      </main>,
    );
    await expectNoA11yViolations(container);
  });
});
