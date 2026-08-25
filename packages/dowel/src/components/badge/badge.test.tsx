import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Badge } from "./index";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Backlog</Badge>);
    expect(screen.getByText("Backlog")).toBeDefined();
  });

  it("defaults to the neutral tone", () => {
    render(<Badge>Backlog</Badge>);
    expect(
      screen
        .getByText("Backlog")
        .closest('[data-dowel-component="badge"]')
        ?.getAttribute("data-tone"),
    ).toBe("neutral");
  });

  it("exposes the tone as a data attribute", () => {
    render(<Badge tone="success">Done</Badge>);
    expect(
      screen
        .getByText("Done")
        .closest('[data-dowel-component="badge"]')
        ?.getAttribute("data-tone"),
    ).toBe("success");
  });

  it("carries compiled StyleX styles", () => {
    render(<Badge>Backlog</Badge>);
    const badge = screen.getByText("Backlog").closest("[data-dowel-component]");
    expect(badge?.className).toBeTruthy();
    expect(badge?.getAttribute("data-dowel-component")).toBe("badge");
  });

  it("ignores className and style smuggled through a spread", () => {
    // BadgeProps Omits className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Badge {...smuggled}>Go</Badge>);
    const badge = screen.getByText("Go").closest("[data-dowel-component]")!;
    expect(badge.className).toBeTruthy();
    expect(badge.className).not.toContain("evil");
    expect(badge.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Badge>Backlog</Badge>);
    expect(
      light.querySelector('[data-dowel-component="badge"]'),
    ).not.toBeNull();
    expect(dark.querySelector('[data-dowel-component="badge"]')).not.toBeNull();
  });

  it("supports a decorative semantic dot", () => {
    render(
      <Badge dot tone="success">
        Active
      </Badge>,
    );
    expect(screen.getByText("Active").previousElementSibling).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Backlog</Badge>);
    await expectNoA11yViolations(container);
  });
});
