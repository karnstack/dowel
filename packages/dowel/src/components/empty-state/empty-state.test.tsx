import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { EmptyState } from "./index";

describe("EmptyState", () => {
  it("renders structured copy and actions", () => {
    render(
      <EmptyState
        title="No repositories"
        description="Connect a repository to start mirroring code."
        actions={<Button variant="primary">Connect repository</Button>}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "No repositories", level: 3 }),
    ).toBeDefined();
    expect(
      screen.getByText("Connect a repository to start mirroring code."),
    ).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Connect repository" }),
    ).toBeDefined();
  });

  it("supports the surrounding page heading level", () => {
    render(<EmptyState headingLevel={2} title="No results" />);
    expect(
      screen.getByRole("heading", { name: "No results", level: 2 }),
    ).toBeDefined();
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<EmptyState title="No results" {...smuggled} />);
    const state = screen
      .getByRole("heading")
      .closest("[data-dowel-component]")!;
    expect(state.className).not.toContain("evil");
    expect(state.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EmptyState
        title="No results"
        description="Try a different search term."
      />,
    );
    await expectNoA11yViolations(container);
  });
});
