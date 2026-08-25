import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Button } from "../button";
import { Callout } from "./index";

describe("Callout", () => {
  it("renders structured content and optional actions", () => {
    render(
      <Callout
        title="Mirror paused"
        icon={<span>!</span>}
        actions={<Button size="sm">Resume</Button>}
      >
        Authentication needs attention.
      </Callout>,
    );
    expect(screen.getByText("Mirror paused")).toBeDefined();
    expect(screen.getByRole("button", { name: "Resume" })).toBeDefined();
  });

  it("preserves semantic roles supplied by the application", () => {
    render(
      <Callout role="status" tone="success">
        Repository connected.
      </Callout>,
    );
    expect(screen.getByRole("status").textContent).toContain(
      "Repository connected",
    );
  });

  it("ignores appearance props smuggled onto the component", () => {
    const smuggled = { className: "evil", style: { color: "red" } };
    render(<Callout {...smuggled}>Safe content</Callout>);
    const callout = screen
      .getByText("Safe content")
      .closest("[data-dowel-component]");
    expect(callout?.className).not.toContain("evil");
    expect(callout?.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <Callout title="Protected branch" tone="warning">
          Two approvals are required before merging.
        </Callout>
      </main>,
    );
    await expectNoA11yViolations(container);
  });
});
