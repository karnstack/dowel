import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Separator } from "./index";

describe("Separator", () => {
  it("is decorative by default", () => {
    const { container } = render(<Separator />);
    const separator = container.querySelector(
      '[data-dowel-component="separator"]',
    )!;
    expect(separator.getAttribute("role")).toBe("none");
    expect(separator.getAttribute("aria-hidden")).toBe("true");
  });

  it("supports a semantic vertical separator", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const separator = screen.getByRole("separator");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator.dataset.orientation).toBe("vertical");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = {
      id: "separator",
      className: "evil",
      style: { color: "red" },
    };
    const { container } = render(<Separator {...smuggled} />);
    const separator = container.querySelector(
      '[data-dowel-component="separator"]',
    )!;
    expect(separator.className).not.toContain("evil");
    expect(separator.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Separator decorative={false} />);
    await expectNoA11yViolations(container);
  });
});
