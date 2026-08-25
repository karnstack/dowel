import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "../../../test/setup";
import { renderBoth } from "../../../test/render";
import { Kbd } from "./index";

describe("Kbd", () => {
  it("renders one kbd element per key", () => {
    const { container } = render(<Kbd keys={["Meta", "K"]} />);
    const keys = container.querySelectorAll("kbd");
    expect(keys).toHaveLength(2);
    expect(keys[0]?.textContent).toBe("Meta");
    expect(keys[1]?.textContent).toBe("K");
  });

  it("renders a single key", () => {
    render(<Kbd keys={["S"]} />);
    expect(screen.getByText("S").tagName).toBe("KBD");
  });

  it("ignores className, style, and children smuggled through a spread", () => {
    // KbdProps Omits className/style/children, but JSX spreads skip
    // excess-property checks, so a wider object typechecks. The runtime must
    // hold the line: the keys array stays the only content source.
    const smuggled = {
      className: "evil",
      style: { color: "red" },
      children: "hijacked",
    };
    const { container } = render(<Kbd keys={["S"]} {...smuggled} />);
    const kbd = container.querySelector('[data-dowel-component="kbd"]');
    expect(kbd).not.toBeNull();
    expect(kbd?.className).not.toContain("evil");
    expect(kbd?.getAttribute("style")).toBeNull();
    expect(kbd?.textContent).toBe("S");
  });

  it("renders in both themes", () => {
    const { light, dark } = renderBoth(<Kbd keys={["S"]} />);
    expect(light.querySelector('[data-dowel-component="kbd"]')).not.toBeNull();
    expect(dark.querySelector('[data-dowel-component="kbd"]')).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Kbd keys={["Meta", "K"]} />);
    await expectNoA11yViolations(container);
  });
});
