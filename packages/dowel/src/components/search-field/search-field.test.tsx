import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Field } from "../input";
import { SearchField } from "./index";

describe("SearchField", () => {
  it("reports changes and clears from the visible action", async () => {
    const onValueChange = vi.fn();
    render(
      <SearchField
        aria-label="Search repositories"
        onValueChange={onValueChange}
        shortcut="⌘K"
      />,
    );

    const input = screen.getByRole("searchbox", {
      name: "Search repositories",
    });
    await userEvent.type(input, "dowel");
    expect(onValueChange).toHaveBeenLastCalledWith("dowel");
    expect(screen.queryByText("⌘K")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect((input as HTMLInputElement).value).toBe("");
    expect(document.activeElement).toBe(input);
  });

  it("clears from Escape without swallowing a prevented key event", async () => {
    render(
      <SearchField aria-label="Search issues" defaultValue="open issues" />,
    );
    const input = screen.getByRole("searchbox", { name: "Search issues" });
    input.focus();
    await userEvent.keyboard("{Escape}");
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("supports controlled values", async () => {
    function Example() {
      const [value, setValue] = useState("repo");
      return (
        <SearchField
          aria-label="Controlled search"
          value={value}
          onValueChange={setValue}
        />
      );
    }
    render(<Example />);
    const input = screen.getByRole("searchbox", { name: "Controlled search" });
    await userEvent.type(input, "s");
    expect((input as HTMLInputElement).value).toBe("repos");
  });

  it("integrates with Field without a hand-written id", () => {
    render(
      <Field.Root>
        <Field.Label>Find a repository</Field.Label>
        <SearchField />
      </Field.Root>,
    );
    expect(
      screen.getByRole("searchbox", { name: "Find a repository" }),
    ).toBeDefined();
  });

  it("ignores appearance props smuggled onto the component", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<SearchField aria-label="Search" {...smuggled} />);
    const input = screen.getByRole("searchbox", { name: "Search" });
    expect(input.className).not.toContain("evil");
    expect(input.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <SearchField aria-label="Search repositories" shortcut="⌘K" />
      </main>,
    );
    await expectNoA11yViolations(container);
  });
});
