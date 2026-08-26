import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { useDowelForm } from "./index";

function Example({
  onSubmit,
}: {
  onSubmit: (value: { title: string }) => void;
}) {
  const form = useDowelForm({
    defaultValues: { title: "" },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <form.AppForm>
      <form.Root aria-label="Issue form">
        <form.AppField
          name="title"
          validators={{
            onBlur: ({ value }) => (value ? undefined : "Title is required"),
          }}
        >
          {(field) => (
            <field.TextField label="Title" description="Keep it concise." />
          )}
        </form.AppField>
        <form.Actions>
          <form.SubmitButton>Create issue</form.SubmitButton>
        </form.Actions>
      </form.Root>
    </form.AppForm>
  );
}

describe("useDowelForm", () => {
  it("binds Dowel fields to TanStack Form submission", async () => {
    const onSubmit = vi.fn();
    render(<Example onSubmit={onSubmit} />);
    await userEvent.type(
      screen.getByRole("textbox", { name: "Title" }),
      "Ship it",
    );
    await userEvent.click(screen.getByRole("button", { name: "Create issue" }));
    expect(onSubmit).toHaveBeenCalledWith({ title: "Ship it" });
  });

  it("renders touched field errors accessibly", async () => {
    const { container } = render(<Example onSubmit={() => {}} />);
    const input = screen.getByRole("textbox", { name: "Title" });
    input.focus();
    await userEvent.tab();
    expect(await screen.findByText("Title is required")).toBeDefined();
    expect(input.getAttribute("aria-invalid")).toBe("true");
    await expectNoA11yViolations(container);
  });
});
