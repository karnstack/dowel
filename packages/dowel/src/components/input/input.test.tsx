import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Field, Input } from "./index";

describe("Input", () => {
  it("renders a textbox", () => {
    render(<Input aria-label="Title" />);
    expect(screen.getByRole("textbox", { name: "Title" })).toBeDefined();
  });

  it("accepts typing", async () => {
    render(<Input aria-label="Title" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect((input as HTMLInputElement).value).toBe("hello");
  });

  it("marks invalid inputs for assistive tech", () => {
    render(<Input aria-label="Title" invalid />);
    expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe(
      "true",
    );
  });

  it("defaults to md size", () => {
    render(<Input aria-label="Title" />);
    expect(screen.getByRole("textbox").dataset.size).toBe("md");
  });

  it("carries the dowel-input class", () => {
    render(<Input aria-label="Title" />);
    expect(screen.getByRole("textbox").className).toContain("dowel-input");
  });

  it("ignores className and style smuggled through a spread", () => {
    // InputProps Omits className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Input aria-label="Title" {...smuggled} />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("dowel-input");
    expect(input.className).not.toContain("evil");
    expect(input.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Input aria-label="Title" />);
    expect(light.querySelector(".dowel-input")).not.toBeNull();
    expect(dark.querySelector(".dowel-input")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Title" />);
    await expectNoA11yViolations(container);
  });
});

describe("Field", () => {
  it("associates the label with the control", () => {
    render(
      <Field.Root>
        <Field.Label>Issue title</Field.Label>
        <Input />
      </Field.Root>,
    );
    expect(screen.getByRole("textbox", { name: "Issue title" })).toBeDefined();
  });

  it("associates the description with the control", () => {
    render(
      <Field.Root>
        <Field.Label>Title</Field.Label>
        <Input />
        <Field.Description>Keep it short</Field.Description>
      </Field.Root>,
    );
    const input = screen.getByRole("textbox");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)?.textContent).toBe(
      "Keep it short",
    );
  });

  it("ignores className and style smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    const { container } = render(
      <Field.Root {...smuggled}>
        <Field.Label {...smuggled}>Title</Field.Label>
        <Input />
        <Field.Description {...smuggled}>Keep it short</Field.Description>
      </Field.Root>,
    );
    for (const selector of [
      ".dowel-field",
      ".dowel-field-label",
      ".dowel-field-description",
    ]) {
      const el = container.querySelector(selector);
      expect(el).not.toBeNull();
      expect(el!.className).not.toContain("evil");
      expect(el!.getAttribute("style")).toBeNull();
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field.Root>
        <Field.Label>Title</Field.Label>
        <Input />
        <Field.Description>Keep it short</Field.Description>
      </Field.Root>,
    );
    await expectNoA11yViolations(container);
  });
});
