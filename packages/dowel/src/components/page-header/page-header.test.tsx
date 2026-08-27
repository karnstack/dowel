import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { PageHeader } from "./index";

describe("PageHeader", () => {
  it("composes navigation, title copy, actions, and secondary content", () => {
    render(
      <PageHeader
        title="Workspace settings"
        description="Manage defaults for every project."
        breadcrumbs={<nav aria-label="Breadcrumb">Workspace</nav>}
        actions={<Button>Invite member</Button>}
      >
        <nav aria-label="Settings views">General</nav>
      </PageHeader>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Workspace settings" }),
    ).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Invite member" })).toBeDefined();
    expect(
      screen.getByRole("navigation", { name: "Settings views" }),
    ).toBeDefined();
  });

  it("supports a surrounding page heading level", () => {
    render(<PageHeader headingLevel={2} title="Project settings" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Project settings" }),
    ).toBeDefined();
  });

  it("does not expose an appearance override", () => {
    const smuggled = { className: "override", style: { color: "red" } };
    render(<PageHeader title="Settings" {...smuggled} />);
    const header = document.querySelector(
      '[data-dowel-component="page-header"]',
    )!;
    expect(header.className).not.toContain("override");
    expect(header.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <PageHeader
        title="Workspace settings"
        description="Manage defaults for every project."
        actions={<Button>Invite member</Button>}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
