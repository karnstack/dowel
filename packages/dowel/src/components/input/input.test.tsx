import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Field, Input, Textarea } from "./index";

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

  it("carries compiled StyleX styles", () => {
    render(<Input aria-label="Title" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toBeTruthy();
    expect(input.dataset.dowelComponent).toBe("input");
  });

  it("supports a borderless bare editing mode", () => {
    render(<Input aria-label="Title" variant="bare" size="title" />);
    const input = screen.getByRole("textbox");
    expect(input.dataset.variant).toBe("bare");
    expect(input.dataset.size).toBe("title");
  });

  it("ignores className and style smuggled through a spread", () => {
    // InputProps Omits className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Input aria-label="Title" {...smuggled} />);
    const input = screen.getByRole("textbox");
    expect(input.className).toBeTruthy();
    expect(input.className).not.toContain("evil");
    expect(input.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Input aria-label="Title" />);
    expect(
      light.querySelector('[data-dowel-component="input"]'),
    ).not.toBeNull();
    expect(dark.querySelector('[data-dowel-component="input"]')).not.toBeNull();
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

  it("renders Field.Error on an invalid field and associates it", () => {
    // `invalid` on Root marks the whole field invalid through Base UI state;
    // `match` makes Error display without a validation run (dowel has no
    // Form yet, and Base UI validates onSubmit by default). Both props exist
    // only because Field's types derive from Base UI, not from "div"/"p".
    render(
      <Field.Root invalid>
        <Field.Label>Title</Field.Label>
        <Input />
        <Field.Error match>Title is required</Field.Error>
      </Field.Root>,
    );
    const input = screen.getByRole("textbox");
    // The invalid field state reaches the control's ARIA without any prop
    // on Input itself.
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const error = document.querySelector(
      '[data-dowel-component="field-error"]',
    );
    expect(error).not.toBeNull();
    expect(error!.textContent).toBe("Title is required");
    // The error is wired into the control's accessible description.
    const describedBy = input.getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(error!.id);
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
    for (const selector of ["field", "field-label", "field-description"]) {
      const el = container.querySelector(
        `[data-dowel-component="${selector}"]`,
      );
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

describe("Textarea", () => {
  it("renders a multiline textbox and accepts typing", async () => {
    render(<Textarea aria-label="Description" variant="bare" />);
    const textarea = screen.getByRole("textbox", { name: "Description" });
    await userEvent.type(textarea, "A clear description");
    expect((textarea as HTMLTextAreaElement).value).toBe("A clear description");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.dataset.variant).toBe("bare");
  });

  it("integrates with Field labels", () => {
    render(
      <Field.Root>
        <Field.Label>Description</Field.Label>
        <Textarea />
      </Field.Root>,
    );
    expect(screen.getByRole("textbox", { name: "Description" })).toBeDefined();
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Textarea aria-label="Description" {...smuggled} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).not.toContain("evil");
    expect(textarea.getAttribute("style")).toBeNull();
  });
});
