import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { PropertyPill } from "../property-pill";
import { Composer } from "./index";

function Example({ onSubmit = vi.fn() }: { onSubmit?: () => void }) {
  return (
    <Composer.Root
      aria-label="Create work item"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Composer.Header>
        <PropertyPill label="Workspace" />
      </Composer.Header>
      <Composer.Body>
        <Composer.Title name="title" placeholder="Add title" />
        <Composer.Description name="description" placeholder="Describe it" />
        <Composer.Divider />
      </Composer.Body>
      <Composer.Properties>
        <PropertyPill label="Status" />
        <PropertyPill label="Assignee" />
      </Composer.Properties>
      <Composer.Footer>
        <Composer.Actions>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Composer.Actions>
      </Composer.Footer>
    </Composer.Root>
  );
}

describe("Composer", () => {
  it("renders borderless title and description controls", () => {
    render(<Example />);
    const title = screen.getByRole("textbox", { name: "Title" });
    const description = screen.getByRole("textbox", { name: "Description" });
    expect(title.dataset.variant).toBe("bare");
    expect(title.dataset.size).toBe("title");
    expect(description.dataset.variant).toBe("bare");
  });

  it("submits as a normal form", async () => {
    const onSubmit = vi.fn();
    render(<Example onSubmit={onSubmit} />);
    await userEvent.type(screen.getByRole("textbox", { name: "Title" }), "Fix");
    await userEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("ignores appearance props smuggled into the shell", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(
      <Composer.Root aria-label="Composer" {...smuggled}>
        <Composer.Body {...smuggled}>Body</Composer.Body>
      </Composer.Root>,
    );
    for (const name of ["composer", "composer-body"]) {
      const element = document.querySelector(
        `[data-dowel-component="${name}"]`,
      );
      expect(element?.className).not.toContain("evil");
      expect(element?.getAttribute("style")).toBeNull();
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example />);
    await expectNoA11yViolations(container);
  });
});
