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
    expect(screen.getByText("Backlog").dataset.tone).toBe("neutral");
  });

  it("exposes the tone as a data attribute", () => {
    render(<Badge tone="success">Done</Badge>);
    expect(screen.getByText("Done").dataset.tone).toBe("success");
  });

  it("carries the dowel-badge class", () => {
    render(<Badge>Backlog</Badge>);
    expect(screen.getByText("Backlog").className).toContain("dowel-badge");
  });

  it("ignores className and style smuggled through a spread", () => {
    // BadgeProps Omits className/style, but JSX spreads skip excess-property
    // checks, so a wider object typechecks. The runtime must hold the line.
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Badge {...smuggled}>Go</Badge>);
    const badge = screen.getByText("Go");
    expect(badge.className).toContain("dowel-badge");
    expect(badge.className).not.toContain("evil");
    expect(badge.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Badge>Backlog</Badge>);
    expect(light.querySelector(".dowel-badge")).not.toBeNull();
    expect(dark.querySelector(".dowel-badge")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Backlog</Badge>);
    await expectNoA11yViolations(container);
  });
});
