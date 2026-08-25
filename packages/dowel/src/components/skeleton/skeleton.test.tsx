import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { Skeleton } from "./index";

describe("Skeleton", () => {
  it("is hidden from the accessibility tree", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector<HTMLElement>(
      '[data-dowel-component="skeleton"]',
    )!;
    expect(skeleton.getAttribute("aria-hidden")).toBe("true");
  });

  it("exposes its visual variant and size", () => {
    const { container } = render(<Skeleton variant="circle" size="lg" />);
    const skeleton = container.querySelector<HTMLElement>(
      '[data-dowel-component="skeleton"]',
    )!;
    expect(skeleton.dataset.variant).toBe("circle");
    expect(skeleton.dataset.size).toBe("lg");
  });

  it("ignores appearance props smuggled through a spread", () => {
    const smuggled = {
      id: "skeleton",
      className: "evil",
      style: { color: "red" },
    };
    const { container } = render(<Skeleton {...smuggled} />);
    const skeleton = container.querySelector(
      '[data-dowel-component="skeleton"]',
    )!;
    expect(skeleton.className).not.toContain("evil");
    expect(skeleton.getAttribute("style")).toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <section aria-label="Loading repositories">
        <Skeleton variant="block" />
      </section>,
    );
    await expectNoA11yViolations(container);
  });
});
