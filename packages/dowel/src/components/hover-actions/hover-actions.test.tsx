import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { expectNoA11yViolations } from "../../../test/setup";
import { HoverActions } from "./index";

describe("HoverActions", () => {
  it("renders a named toolbar and exposes visibility", () => {
    render(
      <HoverActions label="Issue actions" visible={false}>
        <button type="button">Archive</button>
      </HoverActions>,
    );
    const toolbar = screen.getByRole("toolbar", { name: "Issue actions" });
    expect(toolbar.hasAttribute("data-visible")).toBe(false);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <HoverActions>
        <button type="button">Archive</button>
      </HoverActions>,
    );
    await expectNoA11yViolations(container);
  });
});
