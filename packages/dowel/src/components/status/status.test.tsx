import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Status } from "./index";

describe("Status", () => {
  it("renders a named status without creating a live region", () => {
    render(<Status tone="success">Operational</Status>);
    const status = screen
      .getByText("Operational")
      .closest<HTMLElement>("[data-dowel-component]")!;
    expect(status.dataset.tone).toBe("success");
    expect(status.getAttribute("role")).toBeNull();
  });

  it("accepts an application-supplied live region role", () => {
    render(<Status role="status">Connected</Status>);
    expect(screen.getByRole("status").textContent).toContain("Connected");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Status {...smuggled}>Operational</Status>);
    const status = screen
      .getByText("Operational")
      .closest("[data-dowel-component]")!;
    expect(status.className).not.toContain("evil");
    expect(status.getAttribute("style")).toBeNull();
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Status>Operational</Status>);
    expect(
      light.querySelector('[data-dowel-component="status"]'),
    ).not.toBeNull();
    expect(
      dark.querySelector('[data-dowel-component="status"]'),
    ).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Status tone="warning">Degraded</Status>);
    await expectNoA11yViolations(container);
  });
});
